<?php
/**
 * Created by PhpStorm.
 * User: Sorarinu
 * Date: 2016/09/19
 * Time: 20:30
 */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Log;
use Cache;
use Maknz\Slack\Facades\Slack;
use App\Library\BookmarkParser;
use App\Library\Tree;
use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    protected $request;
    private $fs;
    private $html;
    private $flgFiles = false;
    private $parentId = 0;
    private $id = 0;
    private $flg = false;

    public function __construct(Request $request, Filesystem $fs)
    {
        $this->request = $request;
        $this->fs = $fs;
        header("Access-Control-Allow-Origin: *");
    }

    /**
     * サインアップ
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function signUp()
    {
        $errors = '';

        try {
            $rules = [
                'email' => 'required|email',
                'password' => 'required|min:6'
            ];

            $validation = \Validator::make($this->request->all(), $rules);

            if ($validation->passes()) {
                $data = json_decode(json_encode([
                    'password' => $this->request->input('password'),
                    'email' => $this->request->input('email')
                ]));

                $user = new User;
                $user->email = $data->email;
                $user->password = Hash::make($data->password);
                $user->save();

                Slack::send('New user has been created！ This Email Address is *' . $data->email . '*.');
                return new JsonResponse([
                    'status' => 'OK',
                    'message' => $data->email . ' created.'
                ]);
            }

            foreach ($validation->errors()->all() as $error) {
                $errors .= $error;
            }

            return new JsonResponse([
                'status' => 'NG',
                'message' => $errors
            ], 400);
        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'NG',
                'message' => $e->getCode() === '23000' ?
                    'This Email address is already registered.' :
                    $e->getMessage()
            ], 400);
        }
    }

    /**
     * サインイン
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function signIn()
    {
        $errors = '';

        try {
            $rules = [
                'email' => 'required|email',
                'password' => 'required|min:6'
            ];

            $validation = \Validator::make($this->request->all(), $rules);

            if ($validation->passes()) {
                $data = json_decode(json_encode([
                    'password' => $this->request->input('password'),
                    'email' => $this->request->input('email')
                ]));

                $user = User::where('email', $data->email)
                    ->firstOrFail();

                if (Hash::check($data->password, $user->password)) {
                    $this->request->session()->put('email', $user->email);
                    $this->request->session()->put('user_id', $user->id);
                    return new JsonResponse([
                        'status' => 'OK',
                        'message' => 'Login success: ' . $user->email
                    ]);
                }

                throw new \Exception;
            }

            foreach ($validation->errors()->all() as $error) {
                $errors .= $error;
            }

            return new JsonResponse([
                'status' => 'NG',
                'message' => $errors
            ], 400);
        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'NG',
                'message' => 'User Login is Failed. ' . $e->getMessage()
            ], 400);
        }
    }

    /**
     * サインアウト
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function signOut()
    {
        if ($this->request->session()->has('email')) {
            $this->request->session()->forget('email');
            $this->request->session()->forget('user_id');
            return new JsonResponse([
                'status' => 'OK',
                'message' => 'Logged out.'
            ]);
        }

        return new JsonResponse([
            'status' => 'NG',
            'message' => 'This user is not authenticated.'
        ], 400);
    }

    /**
     * ブックマークファイル(HTML)のアップロード
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload()
    {
        $filePath = $this->request->file('bmfile')->getRealPath();
        $tmpTags = '';
        $i = 0;
        $id = $this->getId();
        $parent_id = null;
        $isFind = false;
        $tagPrevValue = null;
        $tagPrevId = null;
        $tagLists = [];
        $bookmarkItems = [];
        $tagListItems = [];
        $bookmarkJson = [
            'status' => 'OK',
            'messages' => 'File Loaded.'
        ];

        try {
            $parser = new BookmarkParser();
            $bookmarks = $parser->parseFile($filePath);

            //タグごとにまとめる
            foreach ($bookmarks as $b) {
                if ($tmpTags === $b['tags']) {
                    continue;
                }

                $tmpTags = $b['tags'];
                $i++;

                foreach ($bookmarks as $bookmark) {
                    if ($bookmark['tags'] === $tmpTags) {
                        $bookmarkItems[$i][] = $bookmark;
                    }
                }
            }

            //フォルダにID付与
            foreach ($bookmarkItems as $bookmarkItem) {
                $tags = explode(',', $bookmarkItem[0]['tags']);

                foreach ($tags as $tag) {
                    if (!isset($tagLists[0])) {
                        $tagLists[] = [
                            'tag' => $tag,
                            'id' => $id,
                        ];
                        $id++;
                    } else {
                        for ($j = 0; $j < count($tagLists); $j++) {
                            if ($tag === $tagLists[$j]['tag']) {
                                $isFind = true;
                                break;
                            }
                            $isFind = false;
                        }

                        if (!$isFind) {
                            $tagLists[] = [
                                'tag' => $tag,
                                'id' => $id,
                            ];

                            $id++;
                        }
                    }
                }
            }

            //ParentID付与
            foreach ($bookmarkItems as $bookmarkItem) {
                $tags = explode(',', $bookmarkItem[0]['tags']);
                $end = end($tags);
                foreach ($tags as $tag) {
                    if ($tag === $end) {
                        @$tagPrevValue = $tags[(count($tags) - 2)];

                        if (!is_null($tagPrevValue)) {
                            foreach ($tagLists as $tagList) {
                                if ($tagList['tag'] === $tagPrevValue) {
                                    $tagPrevId = $tagList['id'];
                                }
                            }

                            for ($i = 0; $i < count($tagLists); $i++) {
                                if ($tagLists[$i]['tag'] === $tag) {
                                    $tagLists[$i]['parent_id'] = $tagPrevId;
                                }
                            }
                        } else {
                            for ($i = 0; $i < count($tagLists); $i++) {
                                if ($tagLists[$i]['tag'] === $tag) {
                                    $tagLists[$i]['parent_id'] = null;
                                }
                            }
                        }
                    }
                }
            }

            //タグの空白要素消す
            foreach ($tagLists as $tagList) {
                if ($tagList['tag'] === '') {
                    unset($tagLists[$tagList['id']]);
                }
            }

            //フォルダ構成だけぶっこむ
            foreach ($tagLists as $tagList) {
                $tagListItems[] = [
                    'id' => $tagList['id'],
                    'parent_id' => $tagList['parent_id'],
                    'title' => $tagList['tag'],
                    'folder' => true
                ];
            }

            $bookmarkJson['bookmark'] = $tagListItems;

            //いい感じにする
            foreach ($bookmarkItems as $bookmarkItem) {
                $tags = explode(',', $bookmarkItem[0]['tags']);

                foreach ($tags as $tag) {
                    if ($tag === end($tags)) {
                        if ($bookmarkItem[0]['tags'] !== '') {
                            if (strstr($bookmarkItem[0]['tags'], $tag)) {
                                foreach ($bookmarkItem as $item) {
                                    foreach ($tagLists as $tagList) {
                                        if ($tagList['tag'] === $tag) {
                                            $parent_id = $tagList['id'];
                                        }
                                    }

                                    $bookmarkItemAfter[] = [
                                        'id' => $id,
                                        'parent_id' => $parent_id,
                                        'title' => $item['title'],
                                        'detail' => $item['note'],
                                        'reg_date' => $item['time'],
                                        'folder' => false,
                                        'url' => $item['uri']
                                    ];

                                    for ($i = 0; $i < count($bookmarkJson['bookmark']); $i++) {
                                        if ($bookmarkJson['bookmark'][$i]['title'] === $tag) {
                                            $bookmarkJson['bookmark'][$i]['bookmark'] = $bookmarkItemAfter;
                                            $id++;
                                        }
                                    }
                                }
                                unset($bookmarkItemAfter);
                            }
                        } else {
                            foreach ($bookmarkItem as $item) {
                                $bookmarkItemAfter = [
                                    'id' => $id,
                                    'parent_id' => null,
                                    'title' => $item['title'],
                                    'detail' => $item['note'],
                                    'reg_date' => $item['time'],
                                    'folder' => false,
                                    'url' => $item['uri']
                                ];

                                array_push($bookmarkJson['bookmark'], $bookmarkItemAfter);
                                $id++;
                            }
                            unset($bookmarkItemAfter);
                        }
                    }
                }
            }
            Log::debug(json_encode($bookmarkJson, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
            $this->insertDB($bookmarkJson);

            return new JsonResponse($bookmarkJson);
        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'NG',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * アップロードデータをMySQLにぶち込む
     *
     * @param $data
     */
    private function insertDB($data)
    {
        $insertFolderData = [];
        $insertNodeData = [];
        $userId = $this->request->session()->get('user_id', function () {
            return 1;
        });

        //非ログインユーザはDBに登録しない
        /*if ($userId === 1) {
            return;
        }*/

        try {
            if ($this->checkExists($userId)) {
                $this->deleteOldData($userId);
            }

            foreach ($data['bookmark'] as $folder) {
                $insertFolderData[] = [
                    'id' => $folder['id'],
                    'user_id' => $userId,
                    'parent_id' => $folder['parent_id'],
                    'title' => $folder['title'],
                    'folder' => $folder['folder']
                ];

                foreach ($folder['bookmark'] as $node) {
                    $insertNodeData[] = [
                        'id' => $node['id'],
                        'user_id' => $userId,
                        'parent_id' => $node['parent_id'],
                        'title' => $node['title'],
                        'detail' => $node['detail'],
                        'reg_date' => $node['reg_date'],
                        'folder' => $node['folder'],
                        'url' => $node['url']
                    ];
                }
            }
            DB::table('bookmark')->insert($insertFolderData);
            DB::table('bookmark')->insert($insertNodeData);
        } catch (\Exception $e) {
            $this->upload();
        }
    }

    /**
     * MySQLのID + 1を返す
     *
     * @return mixed
     */
    private function getId()
    {
        return DB::table('bookmark')->max('id') + 1;
    }

    /**
     * DBにすでにアップロードしてるか判定
     *
     * @param $userId
     * @return bool
     */
    private function checkExists($userId)
    {
        $result = DB::table('bookmark')->select('user_id')->where('user_id', '=', $userId)->get();

        if (isset($result[0])) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * アップロード時にDBから古いデータを消す
     *
     * @param $userId
     * @return mixed
     */
    private function deleteOldData($userId)
    {
        return DB::table('bookmark')->where('user_id', '=', $userId)->delete();
    }


    public function testFunction($bookmarks, $html, $browserType)
    {
        $bookmarks = (array)$bookmarks;

        foreach ($bookmarks as $val) {
            if (isset($val['bookmark'])) {
                $this->html = $this->makeHtmlData($browserType, $val, $this->html, 'Folder');
                $this->testFunction($val['bookmark'], $this->html, $browserType);
            } else {
                $this->html = $this->makeHtmlData($browserType, $val, $this->html, 'File');
            }
        }

        return $this->html;
    }

    public function export($browserType)
    {
        $prevId = null;
        $this->html = $this->addHtmlHeaders($browserType);
        $userId = $this->request->session()->get('user_id', function () {
            return 1;
        });
        $bookmarks = DB::table('bookmark')
            ->where('user_id', '=', $userId)
            ->get();

        $bookmarks = Tree::listToTree(json_decode(json_encode($bookmarks), true));
        $html = $this->testFunction($bookmarks, $this->html, $browserType);
        exit;
    }


    /**
     * 各種ブラウザエクスポート用のヘッダをくっつける
     *
     * @param $browserType
     * @return string
     */
    private function addHtmlHeaders($browserType)
    {
        $html = '';

        switch ($browserType) {
            case 'chrome':
                $html = <<< EOF
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>

EOF;

                break;

            case 'firefox':
                $html = <<< EOF
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>ブックマークメニュー</H1>

EOF;

                break;

            case 'safari':
                $html = <<< EOF
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<Title>ブックマーク</Title>
<H1>ブックマーク</H1>

EOF;

                break;

            case 'ie':
                $html = <<< EOF
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>

EOF;

                break;

            default:
                break;
        }

        return $html;
    }

    private function makeHtmlData($browserType, $data, $html, $type)
    {
        switch ($browserType) {
            case 'chrome':
                if ($type === 'Folder') {
                    if($data['title'] === 'ブックマーク バー') {
                        return $html;
                    }
                    
                    if ($this->flgFiles) {
                        $this->flgFiles = false;
                        $html = $html . '</DL><p>' . PHP_EOL;
                    }
                    $this->id = $data['id'];
                    $html = $html . '<DT><H3 ADD_DATE="' . $data['reg_date'] . '">' . $data['title'] . '</H3>' . PHP_EOL;
                    if (isset($data['bookmark'])) {
                        $html = $html . '<DL><p>' . PHP_EOL;
                    }
                } else {
                    if (!$this->flgFiles) {
                        $this->flgFiles = true;
                    }

                    if ($this->id === $data['parent_id']) {
                        $this->flg = true;
                    } else {
                        if ($this->flg) {
                            $html = $html . '</DL><p>' . PHP_EOL;
                            $this->flg = false;
                        }
                    }
                    
                    $this->parentId = $data['parent_id'];
                    $html = $html . '<DT><A HREF="' . $data['url'] . '" ADD_DATE="' . strtotime($data['reg_date']) . '">' . $data['title'] . '</A>' . PHP_EOL;
                }

                break;

            case 'firefox':
                break;

            case 'safari':
                break;

            case 'ie':
                break;

            default:
                break;
        }

        return $html;
    }

    public function create()
    {
    }

    public function update()
    {
    }

    public function getAll()
    {
    }
}