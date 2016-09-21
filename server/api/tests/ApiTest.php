<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ApiTest extends TestCase
{
    public function testSignUpSuccess()
    {
        $this->withoutMiddleware();
        $this->post('/api/v1/signup', ['userId' => 'testCase', 'password' => 'hogehoge', 'email' => 'hoge@hoge.jp'])
            ->seeJson([
                'status' => 'OK',
                'message' => 'testCase created.',
            ]);
    }

    public function testSignUpFailedUserId()
    {
        $this->withoutMiddleware();
        $this->post('/api/v1/signup', ['userId' => 'testC', 'password' => 'hogehoge', 'email' => 'hoge@hoge.jp'])
            ->seeJson([
                'status' => 'NG',
                'message' => 'testC signUp Failed.',
            ]);
    }

    public function testSignUpFailedEmail()
    {
        $this->withoutMiddleware();
        $this->post('/api/v1/signup', ['userId' => 'testCase', 'password' => 'hogehoge', 'email' => 'hoge*hmkoge.jp'])
            ->seeJson([
                'status' => 'NG',
                'message' => 'testCase signUp Failed.',
            ]);
    }

    public function testSignUpFailedPassword()
    {
        $this->withoutMiddleware();
        $this->post('/api/v1/signup', ['userId' => 'testCase', 'password' => 'jj', 'email' => 'hoge@hmkoge.jp'])
            ->seeJson([
                'status' => 'NG',
                'message' => 'testCase signUp Failed.',
            ]);
    }
}
