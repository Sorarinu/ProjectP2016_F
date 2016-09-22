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
}
