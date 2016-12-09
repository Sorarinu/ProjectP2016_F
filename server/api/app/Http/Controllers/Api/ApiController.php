<?php
/**
 * Created by PhpStorm.
 * User: Sorarinu
 * Date: 2016/09/19
 * Time: 20:30
 */

namespace App\Http\Controllers\Api;

use App\Db_Bookmark;
use App\Http\Controllers\Controller;
use App\Library\Bookmark;
use App\Library\BookmarkUpload;
use App\User;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Library\Knp\Snappy\SnappyImage;
use Intervention\Image\Facades\Image;
use Log;
use Cache;
use Maknz\Slack\Facades\Slack;
use App\Library\BookmarkParser;
use App\Library\Tree;
use App\Library\BookmarkExport;
use App\Library\BookmarkDB;
use Illuminate\Http\JsonResponse;
use Psy\Util\Json;

class ApiController extends Controller
{
    public $request;
    private $fs;
    private $html = '';

    public function __construct(Request $request, Filesystem $fs)
    {
        $this->request = $request;
        $this->fs = $fs;
        header("Access-Control-Allow-Origin: *");
    }

    /**
     * ユーザのセッションIDをセッションに保存する
     * 非ログインユーザの場合には，これをUserIdとして使用する
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function init(Request $request)
    {
        try {
            $this->request->session()->put('user_id', $request->session()->get('_token'));

            return new JsonResponse([
                'status' => 'OK',
                'message' => 'saved session id.'
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'NG',
                'message' => $e->getMessage()
            ], 400);
        }
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
                    Slack::send('User was Logged in at *' . $data->email . '*.');

                    $this->request->session()->put('email', $user->email);
                    $this->request->session()->put('user_id', $user->email);
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
    public function upload(Request $request)
    {
        $bookmarkDB = new BookmarkDB($this->request);
        $filePath = $this->request->file('bmfile')->getRealPath();
        $uploadClass = new BookmarkUpload($this->request);

        Log::debug('UserId : ' . $request->session()->get('user_id'));
        try {
            $parser = new BookmarkParser();
            $bookmarks = $parser->parseFile($filePath);
            $bookmarkJson = $uploadClass->makeBookmarkJson($bookmarks);
            $bookmarkDB->insertDB($bookmarkJson);

            return new JsonResponse($bookmarkJson);
        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'NG',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * ブラウザでインポートできる形式でエクスポートする
     *
     * @param $browserType
     * @return mixed
     */
    public function export($browserType)
    {
        $bookmarkExport = new BookmarkExport();
        $prevId = null;
        $this->html .= $bookmarkExport->addHtmlHeaders($browserType);
        $bookmarks = Bookmark::getAllBookmarkByDB($this->request);
        $this->html .= $bookmarkExport->makeExportData($bookmarks, $this->html, null, $browserType);
        $bookmark = $bookmarkExport->getLocalBookmarkResource($this->html);

        return $bookmark;
    }

    /**
     * 新規ブックマークをデータベースに登録する
     *
     * @return JsonResponse
     */
    public function create()
    {
        try {
            $json = json_decode(file_get_contents('php://input'));

            $bookmark = new Db_Bookmark();
            $bookmark->title = $json->title;
            $bookmark->detail = $json->detail;
            $bookmark->reg_date = $json->reg_date;
            $bookmark->parent_id = $json->parent_id;
            $bookmark->folder = $json->folder;
            $bookmark->url = $json->url;
            $bookmark->save();

            $bookmark = Db_Bookmark::where('title', $json->title)
                ->where('detail', $json->detail)
                ->where('url', $json->url)
                ->firstOrFail();

            return new JsonResponse([
                'status' => 'OK',
                'message' => '',
                'id' => $bookmark['id']
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'NG',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * 指定されたBookmarkIDをもつブックマークの情報を更新する
     *
     * @param $bookmarkId
     * @return JsonResponse
     */
    public function update($bookmarkId)
    {
        try {
            $json = json_decode(file_get_contents('php://input'));
            $bookmark = Db_Bookmark::find($bookmarkId);
            $bookmark->title = $json->title;
            $bookmark->detail = $json->detail;
            $bookmark->reg_date = $json->reg_date;
            $bookmark->parent_id = $json->parent_id;
            $bookmark->folder = $json->folder;
            $bookmark->url = $json->url;
            $bookmark->save();

            return new JsonResponse([
                'status' => 'OK',
                'message' => 'Update Success.'
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'NG',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * 指定されたBookmarkIDをもつブックマークをデータベースから削除する
     *
     * @param $bookmarkId
     * @return JsonResponse
     */
    public function delete($bookmarkId)
    {
        try {
            $bookmark = Db_Bookmark::find($bookmarkId);
            $bookmark->delete();

            return new JsonResponse(['status' => 'OK']);
        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'NG',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * 全てのブックマークを取得する
     */
    public function getAll()
    {
        return json_encode(Bookmark::getAllBookmarkByDB($this->request), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    /**
     * 指定されたホームページのスクショを取得する
     *
     * @return mixed
     */
    public function snap()
    {
        $url = $this->request->input('url');
        $apiUrl = 'http://capture.heartrails.com/120×120?' . $url;
        $image = Image::make(file_get_contents($apiUrl));
        return $image->response('jpg');
    }

    /**
     * 類似度のやつ
     *
     * @return mixed
     */
    public function similarity()
    {
        $json = json_encode(json_decode(file_get_contents('php://input')), JSON_UNESCAPED_SLASHES);
        $client = new \GuzzleHttp\Client();;

        $res = $client->request('POST', 'http://127.0.0.1:8089/api/v1/similarity-search/', [
            'headers' => [
                'Accept' => 'application/json',
                'Content-type' => 'application/json'
            ],
            'json' => $json
        ]);
        
        return $res->getBody();
    }
}
