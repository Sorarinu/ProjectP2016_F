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
}
