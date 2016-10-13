<?php
/**
 * Created by PhpStorm.
 * User: Sorarinu
 * Date: 2016/09/19
 * Time: 20:30
 */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Library\BookmarkUpload;
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
use App\Library\BookmarkExport;
use App\Library\BookmarkDB;
use Illuminate\Http\JsonResponse;

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
        $bookmarkDB = new BookmarkDB($this->request);
        $filePath = $this->request->file('bmfile')->getRealPath();
        $uploadClass = new BookmarkUpload($this->request);

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
        $userId = $this->request->session()->get('user_id', function () {
            return 1;
        });
        $bookmarks = DB::table('bookmark')
            ->where('user_id', '=', $userId)
            ->get();

        $bookmarks = Tree::listToTree(json_decode(json_encode($bookmarks), true));
        $this->html .= $bookmarkExport->makeExportData($bookmarks, $this->html, null, $browserType);

        return $this->html;
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