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
use Htmldom;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Log;
use Maknz\Slack\Facades\Slack;
use App\Library\BookmarkParser;

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
                return response()->json(['status' => 'OK', 'message' => $data->email . ' created.']);
            }

            foreach ($validation->errors()->all() as $error) {
                $errors .= $error;
            }

            return response()->json(['status' => 'NG', 'message' => $errors]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'NG',
                'message' => $e->getCode() === '23000' ? 'This Email address is already registered.' : $e->getMessage()]);
        }
    }

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
                    return response()->json(['status' => 'OK', 'message' => 'Login success: ' . $user->email]);
                }

                throw new \Exception;
            }

            foreach ($validation->errors()->all() as $error) {
                $errors .= $error;
            }

            return response()->json(['status' => 'NG', 'message' => $errors]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'NG', 'message' => 'User Login is Failed. ' . $e->getMessage()]);
        }
    }

    public function signOut()
    {
        if ($this->request->session()->has('email')) {
            $this->request->session()->forget('email');
            return response()->json(['status' => 'OK', 'message' => 'Logged out.']);
        }

        return response()->json(['status' => 'NG', 'message' => 'This user is not authenticated.']);
    }

    public function upload()
    {
        $filePath = $this->request->file('bmfile')->getRealPath();
        $tmpTags = '';
        $i = 0;
        $id = 0;
        $isFind = false;
        $tagId = 0;
        $tagPrevValue = null;
        $tagPrevId = null;
        $tagLists = [];
        $bookmarkItems = [];
        $tagListItems = [];
        $bookmarkJson = [
            'status' => 'OK',
            'messages' => 'File Loaded.'
        ];

        $parser = new BookmarkParser();
        $bookmarks = $parser->parseFile($filePath);

        //タグごとにまとめる
        foreach ($bookmarks as $b) {
            if ($tmpTags === $b['tags'])
                continue;

            $tmpTags = $b['tags'];;
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
                        'id' => $tagId,
                    ];
                    $tagId++;
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
                            'id' => $tagId,
                        ];

                        $tagId++;
                    }
                }
            }
        }

        //ParentID付与
        foreach ($bookmarkItems as $bookmarkItem) {
            $tags = explode(',', $bookmarkItem[0]['tags']);
            $end = end($tags);
            foreach ($tags as $tag) {
                if($tag === $end) {
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
                    if (strstr($bookmarkItem[0]['tags'], $tag)) {
                        foreach ($bookmarkItem as $item) {
                            foreach ($tagLists as $tagList) {
                                if($tagList['tag'] === $tag)
                                    $parent_id = $tagList['id'];
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

                            for($i = 0; $i < count($bookmarkJson['bookmark']); $i++) {
                                if($bookmarkJson['bookmark'][$i]['title'] === $tag) {
                                    $bookmarkJson['bookmark'][$i]['bookmark'] = $bookmarkItemAfter;
                                    $id++;
                                }
                            }
                        }
                        unset($bookmarkItemAfter);
                    }
                }
            }
        }

        return response()->json($bookmarkJson);
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