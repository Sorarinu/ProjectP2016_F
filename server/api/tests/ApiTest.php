<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiTest extends TestCase
{
    public function testSignUpSuccess()
    {
        $email = 'hoge@hoge.jp';
        $password = 'hogehoge';

        $this->withoutMiddleware();
        $this->post('/api/v1/signup', ['email' => $email, 'password' => $password])
            ->seeJson([
                'status' => 'OK',
                'message' => $email . ' created.',
            ]);
    }

    public function testSignInSuccess()
    {
        $email = 'hoge@hoge.jp';
        $password = 'hogehoge';

        $this->withoutMiddleware();
        $this->post('/api/v1/signin', ['email' => $email, 'password' => $password])
            ->seeJson([
                'status' => 'OK',
                'message' => 'Login success: ' . $email,
            ]);
    }

    public function testSignInFailed()
    {
        $email = 'hoge@hoge.jp';
        $password = 'hogehogea';

        $this->withoutMiddleware();
        $this->post('/api/v1/signin', ['email' => $email, 'password' => $password])
            ->seeJson([
                'status' => 'NG',
                'message' => 'User Login is Failed.',
            ]);
    }

    public function testSignInFailed2()
    {
        $email = 'hoge@hogehogehoge.jp';
        $password = 'hogehoge';

        $this->withoutMiddleware();
        $this->post('/api/v1/signin', ['email' => $email, 'password' => $password])
            ->seeJson([
                'status' => 'NG',
                'message' => 'User Login is Failed.',
            ]);
    }
}
