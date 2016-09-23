<?php
    /**
     * Created by PhpStorm.
     * User: Sorarinu
     * Date: 2016/09/19
     * Time: 20:30
     */

namespace app\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Maknz\Slack\Facades\Slack;

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

            return response()->json(['status' => 'NG', 'message' => $validation->messages()]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'NG',
                'message' => $e->getCode() === '23000' ? 'This Email address is already registered.' : $e->getMessage()]);
        }
    }

    public function signIn()
    {
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
                    return response()->json(['status' => 'OK', 'message' => 'Login success: ' . $user->email]);
                }

                throw new \Exception;
            }
            
            return response()->json(['status' => 'NG', 'message' => $validation->messages()]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'NG', 'message' => 'User Login is Failed.']);
        }
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
