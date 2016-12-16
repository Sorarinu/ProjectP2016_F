<?php
/**
 * Created by PhpStorm.
 * User: Sorarinu
 * Date: 2016/10/12
 * Time: 21:27
 */

namespace App\Library;

use Illuminate\Http\Request;
use Log;

class BookmarkUpload
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * アップロードされたデータをJsonに整形する
     *
     * @param $bookmarks
     * @return array
     */
    public function makeBookmarkJson($bookmarks)
    {
        $bookmarkDB = new BookmarkDB($this->request);
        //$id = $bookmarkDB->enquiryNextId();
        $id = 0;
        $parent_id = null;
        $isFind = false;
        $tagPrevValue = null;
        $tagPrevId = null;
        $tagLists = [];
        $bookmarkItems = [];
        $tagListItems = [];
        $bookmarkJson = [
            'status' => 'OK',
            'messages' => 'File Loaded.'
        ];
        $tmpTags = '';
        $i = 0;

        //ブックマークをフォルダ毎に纏める
        foreach ($bookmarks as $b) {
            if ($tmpTags === $b['tags']) {
                continue;
            }

            $tmpTags = $b['tags'];
            $i++;

            foreach ($bookmarks as $bookmark) {
                if ($bookmark['tags'] === $tmpTags) {
                    $bookmarkItems[$i][] = $bookmark;
                }
            }
        }

        //フォルダにIDを付与
        foreach ($bookmarkItems as $bookmarkItem) {
            $tags = explode(',', $bookmarkItem[0]['tags']);

            foreach ($tags as $tag) {
                if (!isset($tagLists[0])) {
                    $tagLists[] = [
                        'tag' => $tag,
                        'id' => $id,
                    ];
                    $id++;
                } else {
                    for ($j = 0; $j < count($tagLists); $j++) {
                        if ($tag === $tagLists[$j]['tag']) {
                            $isFind = true;
                            break;
                        }
                        $isFind = false;
                    }

                    if (!$isFind) {
                        $tagLists[] = [
                            'tag' => $tag,
                            'id' => $id,
                        ];

                        $id++;
                    }
                }
            }
        }

        //['bookmark']に含まれるノードにParentIDを付与する
        foreach ($bookmarkItems as $bookmarkItem) {
            $tags = explode(',', $bookmarkItem[0]['tags']);
            $end = end($tags);
            foreach ($tags as $tag) {
                if ($tag === $end) {
                    @$tagPrevValue = $tags[(count($tags) - 2)];

                    if (!is_null($tagPrevValue)) {
                        foreach ($tagLists as $tagList) {
                            if ($tagList['tag'] === $tagPrevValue) {
                                $tagPrevId = $tagList['id'];
                            }
                        }

                        for ($i = 0; $i < count($tagLists); $i++) {
                            if ($tagLists[$i]['tag'] === $tag) {
                                $tagLists[$i]['parent_id'] = $tagPrevId;
                            }
                        }
                    } else {
                        for ($i = 0; $i < count($tagLists); $i++) {
                            if ($tagLists[$i]['tag'] === $tag) {
                                $tagLists[$i]['parent_id'] = null;
                            }
                        }
                    }
                }
            }
        }

        //タグの空白要素を消す
        foreach ($tagLists as $tagList) {
            if ($tagList['tag'] === '') {
                unset($tagLists[$tagList['id'] - 1]);
            }
        }
        
        //Folder = trueをもつノードを格納する
        foreach ($tagLists as $tagList) {
            $tagListItems[] = [
                'id' => $tagList['id'],
                'parent_id' => $tagList['parent_id'],
                'title' => $tagList['tag'],
                'folder' => true
            ];
        }

        $bookmarkJson['bookmark'] = $tagListItems;

        //先に入れたフォルダに対応するノードをParent_IDを付与して纏める
        foreach ($bookmarkItems as $bookmarkItem) {
            $tags = explode(',', $bookmarkItem[0]['tags']);

            foreach ($tags as $tag) {
                if ($tag === end($tags)) {
                    if ($bookmarkItem[0]['tags'] !== '') {
                        if (strstr($bookmarkItem[0]['tags'], $tag)) {
                            foreach ($bookmarkItem as $item) {
                                foreach ($tagLists as $tagList) {
                                    if ($tagList['tag'] === $tag) {
                                        $parent_id = $tagList['id'];
                                    }
                                }

                                $bookmarkItemAfter[] = [
                                    'id' => $id,
                                    'parent_id' => $parent_id,
                                    'title' => $item['title'],
                                    'detail' => $item['note'],
                                    'reg_date' => $item['time'],
                                    'folder' => false,
                                    'url' => $item['uri']
                                ];

                                for ($i = 0; $i < count($bookmarkJson['bookmark']); $i++) {
                                    if ($bookmarkJson['bookmark'][$i]['title'] === $tag) {
                                        $bookmarkJson['bookmark'][$i]['bookmark'] = $bookmarkItemAfter;
                                        $id++;
                                    }
                                }
                            }
                            unset($bookmarkItemAfter);
                        }
                    } else {    //tag(フォルダ)情報を持っていなかった場合にはParentIDをNULLにして格納
                        foreach ($bookmarkItem as $item) {
                            $bookmarkItemAfter = [
                                'id' => $id,
                                'parent_id' => null,
                                'title' => $item['title'],
                                'detail' => $item['note'],
                                'reg_date' => $item['time'],
                                'folder' => false,
                                'url' => $item['uri']
                            ];

                            array_push($bookmarkJson['bookmark'], $bookmarkItemAfter);
                            $id++;
                        }
                        unset($bookmarkItemAfter);
                    }
                }
            }
        }

        return $bookmarkJson;
    }
}