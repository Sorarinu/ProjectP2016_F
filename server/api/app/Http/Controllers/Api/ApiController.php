<?php
    /**
     * Created by PhpStorm.
     * User: Sorarinu
     * Date: 2016/09/19
     * Time: 20:30
     */

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApiController extends Controller
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function signup()
    {
    }

    public function signin()
    {
    }

    public function signout()
    {
    }

    public function upload()
    {
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
        $users = DB::table('users')->get();
Log::debug($users);
        //return json_encode($users);
    }
}