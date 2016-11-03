<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DB_Bookmark extends Model
{
    protected $table = 'bookmark';
    protected $fillable = ['id', 'user_id', 'parent_id', 'title', 'detail', 'reg_date', 'folder', 'url'];
}
