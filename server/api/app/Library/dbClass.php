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

class DbClass
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
    }

    /**
     * MySQLのID + 1を返す
     *
     * @return mixed
     */
    public function getId()
    {
        return DB::table('bookmark')->max('id') + 1;
    }

    /**
     * DBにすでにアップロードしてるか判定
     *
     * @param $userId
     * @return bool
     */
    public function checkExists($userId)
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
    public function deleteOldData($userId)
    {
        return DB::table('bookmark')->where('user_id', '=', $userId)->delete();
    }

}