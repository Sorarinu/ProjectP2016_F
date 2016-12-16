<?php
/**
 * Created by PhpStorm.
 * User: Sorarinu
 * Date: 2016/10/12
 * Time: 21:01
 */

namespace app\Library;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Log;

class BookmarkDB
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * アップロードデータをMySQLにぶち込む
     *
     * @param $data
     */
    public function insertDB($data)
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

        if ($this->checkExists($userId)) {
            $this->deleteOldData($userId);
        }

        foreach ($data['bookmark'] as $folder) {
            if (!isset($folder['url'])) {
                $insertFolderData[] = [
                    'bookmark_Id' => $folder['id'],
                    'user_id' => $userId,
                    'parent_id' => $folder['parent_id'],
                    'title' => $folder['title'],
                    'folder' => $folder['folder']
                ];
            }

            if (isset($folder['bookmark'])) {
                foreach ($folder['bookmark'] as $node) {
                    $insertNodeData[] = [
                        'bookmark_Id' => $node['id'],
                        'user_id' => $userId,
                        'parent_id' => $node['parent_id'],
                        'title' => $node['title'],
                        'detail' => $node['detail'],
                        'reg_date' => $node['reg_date'],
                        'folder' => $node['folder'],
                        'url' => $node['url']
                    ];
                }
            } else if (!isset($folder['bookmark']) && isset($folder['url'])) {
                $insertNodeData[] = [
                    'bookmark_Id' => $folder['id'],
                    'user_id' => $userId,
                    'parent_id' => $folder['parent_id'],
                    'title' => $folder['title'],
                    'detail' => $folder['detail'],
                    'reg_date' => $folder['reg_date'],
                    'folder' => $folder['folder'],
                    'url' => $folder['url']
                ];
            }
        }
        DB::table('bookmark')->insert($insertFolderData);
        DB::table('bookmark')->insert($insertNodeData);
    }

    /**
     * MySQLのID + 1を返す
     *
     * @return mixed
     */
    public function enquiryNextId()
    {
        return DB::table('bookmark')->max('id') + 1;
    }

    /**
     * 指定されたユーザーIDのブックマークが存在するか調べる
     *
     * @param $userId
     * @return bool
     */
    public static function checkExists($userId)
    {
        $result = DB::table('bookmark')->select('user_id')->where('user_id', '=', $userId)->get();

        if (isset($result[0])) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 指定したユーザIDのアップロードされているブックマークを削除する
     *
     * @param $userId
     * @return mixed
     */
    public static function deleteOldData($userId)
    {
        return DB::table('bookmark')->where('user_id', '=', $userId)->delete();
    }

}