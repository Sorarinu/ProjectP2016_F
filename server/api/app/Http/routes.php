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

Route::get('api/v1/init',                            ['uses' => 'Api\ApiController@init']);
Route::post('api/v1/signup',                         ['uses' => 'Api\ApiController@signUp']);
Route::post('api/v1/signin',                         ['uses' => 'Api\ApiController@signIn']);
Route::get('api/v1/signout',                         ['uses' => 'Api\ApiController@signOut']);
Route::post('api/v1/bookmarks/upload',               ['uses' => 'Api\ApiController@upload']);
Route::get('api/v1/bookmarks/export/{browser_type}', ['uses' => 'Api\ApiController@export']);
Route::post('api/v1/bookmarks',                      ['uses' => 'Api\ApiController@create']);
Route::put('api/v1/bookmarks/{bookmark_id}',         ['uses' => 'Api\ApiController@update']);
Route::delete('api/v1/bookmarks/{bookmark_id}',      ['uses' => 'Api\ApiController@delete']);
Route::get('api/v1/bookmarks',                       ['uses' => 'Api\ApiController@getAll']);
Route::get('api/v1/snap',                            ['uses' => 'Api\ApiController@snap']);
Route::post('api/v1/similarity-search',              ['uses' => 'Api\ApiController@similarity']);