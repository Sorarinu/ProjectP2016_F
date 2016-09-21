<?php
    /**
     * Created by PhpStorm.
     * User: Sorarinu
     * Date: 2016/09/19
     * Time: 20:30
     */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller
{
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function signUp()
    {
        try {
            $rules = [
                'userId' => 'required|between:6,10|alpha_num',
                'email' => 'required|email',
                'password' => 'required|between:8,32'
            ];

            $validation = \Validator::make($this->request->all(), $rules);

            if ($validation->passes()) {
                $data = [
                    'userId' => $this->request->input('userId'),
                    'password' => $this->request->input('password'),
                    'email' => $this->request->input('email')
                ];

                $users = new Users;
                $users->id = $data['userId'];
                $users->password = Hash::make($data['password']);
                $users->email = $data['email'];
                $users->save();

                return json_encode(['status' => 'OK', 'message' => $data['userId'] . ' created.']);
            }

            return json_encode(['status' => 'NG', 'message' => $this->request->input('userId') . ' signUp Failed.']);

        }catch(\Exception $e) {
            return json_encode(['status' => 'NG', 'message' => $data['userId'] . ' signUp Failed.']);
        }
    }

    public function signIn()
    {
    }

    public function signOut()
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
    }
}