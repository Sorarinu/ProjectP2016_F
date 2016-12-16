<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Db_Bookmark extends Model
{
    protected $table = 'bookmark';
    protected $fillable = ['bookmark_Id', 'user_id', 'parent_id', 'title', 'detail', 'reg_date', 'folder', 'url'];
}
