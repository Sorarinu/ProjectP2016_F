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
use Illuminate\Support\Facades\Hash;
use Log;
use Maknz\Slack\Facades\Slack;
use App\Library\BookmarkParser;
use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    protected $request;
    private $fs;

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
        $id = 0;
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

            return new JsonResponse($bookmarkJson);
        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'NG',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function export()
    {
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