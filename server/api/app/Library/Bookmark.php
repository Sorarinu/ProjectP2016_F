<?php
/**
 * Created by PhpStorm.
 * User: Sorarinu
 * Date: 2016/10/12
 * Time: 20:47
 */

namespace app\Library;

use Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Library\Tree;

class Bookmark
{
    public static function getAllBookmarkByDB(Request $request)
    {
        $userId = $request->session()->get('user_id', function () {
            return 1;
        });
        $bookmarks = DB::table('bookmark')
            ->where('user_id', '=', $userId)
            ->get();

        $bookmarks = Tree::listToTree(json_decode(json_encode($bookmarks), true));
        
        return $bookmarks;
    }
}