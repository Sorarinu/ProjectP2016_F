<?php

    /*
    |--------------------------------------------------------------------------
    | Application Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register all of the routes for an application.
    | It's a breeze. Simply tell Laravel the URIs it should respond to
    | and give it the controller to call when that URI is requested.
    |
    */

    Route::get('/', function () {
        return view('welcome');
    });

    Route::post('api/v1/signup',                 ['uses' => 'api\ApiController@signup']);
    Route::get('api/v1/signin',                  ['uses' => 'api\ApiController@signin']);
    Route::get('api/v1/signout',                 ['uses' => 'api\ApiController@signout']);
    Route::post('api/v1/bookmarks/upload',       ['uses' => 'api\ApiController@upload']);
    Route::get('api/v1/bookmarks/export',        ['uses' => 'api\ApiController@export']);
    Route::post('api/v1/bookmarks',              ['uses' => 'api\ApiController@create']);
    Route::put('api/v1/bookmarks/{bookmark_id}', ['uses' => 'api\ApiController@update']);
    Route::get('api/v1/bookmarks',               ['uses' => 'api\ApiController@getAll']);