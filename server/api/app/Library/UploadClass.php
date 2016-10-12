<?php
/**
 * Created by PhpStorm.
 * User: Sorarinu
 * Date: 2016/10/12
 * Time: 21:27
 */

namespace App\Library;

use Illuminate\Http\Request;

class UploadClass
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
        $dbClass = new DbClass($this->request);
        $id = $dbClass->getId();
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

        //タグごとにまとめる
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

        //フォルダにID付与
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

        //ParentID付与
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

        //タグの空白要素消す
        foreach ($tagLists as $tagList) {
            if ($tagList['tag'] === '') {
                unset($tagLists[$tagList['id']]);
            }
        }

        //フォルダ構成だけぶっこむ
        foreach ($tagLists as $tagList) {
            $tagListItems[] = [
                'id' => $tagList['id'],
                'parent_id' => $tagList['parent_id'],
                'title' => $tagList['tag'],
                'folder' => true
            ];
        }

        $bookmarkJson['bookmark'] = $tagListItems;

        //いい感じにする
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
                    } else {
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