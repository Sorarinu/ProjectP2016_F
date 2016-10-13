<?php
/**
 * Created by PhpStorm.
 * User: Sorarinu
 * Date: 2016/10/12
 * Time: 20:47
 */

namespace app\Library;


class ExportClass
{
    protected $request;
    private $html;
    private $flgFiles = false;
    private $parentId = 0;
    private $id = 0;
    private $isChildren = false;

    /**
     * 各種ブラウザエクスポート用のヘッダをくっつける
     *
     * @param $browserType
     * @return string
     */
    public function addHtmlHeaders($browserType)
    {
        $html = '';

        switch ($browserType) {
            case 'chrome':
                $html = <<< EOF
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>

EOF;

                break;

            case 'firefox':
                $html = <<< EOF
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>ブックマークメニュー</H1>

EOF;

                break;

            case 'safari':
                $html = <<< EOF
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<Title>ブックマーク</Title>
<H1>ブックマーク</H1>

EOF;

                break;

            case 'ie':
                $html = <<< EOF
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>

EOF;

                break;

            default:
                break;
        }

        return $html;
    }

    public function makeExportData($bookmarks, $html, $browserType)
    {
        $bookmarks = (array)$bookmarks;

        foreach ($bookmarks as $val) {
            if (isset($val['bookmark'])) {
                $this->html = self::makeHtmlData($browserType, $val, $this->html, 'Folder');
                $this->makeExportData($val['bookmark'], $this->html, $browserType);
            } else {
                $this->html = $this->makeHtmlData($browserType, $val, $this->html, 'File');
            }
        }

        return $this->html;
    }

    public function makeHtmlData($browserType, $data, $html, $type)
    {
        switch ($browserType) {
            case 'chrome':
                if ($type === 'Folder') {
                    if($data['title'] === 'ブックマーク バー') {
                        return $html;
                    }

                    if ($this->flgFiles) {
                        $this->flgFiles = false;
                        $html = $html . '</DL><p>' . PHP_EOL;
                    }
                    $this->id = $data['id'];
                    $html = $html . '<DT><H3 ADD_DATE="' . $data['reg_date'] . '">' . $data['title'] . '</H3>' . PHP_EOL;
                    if (isset($data['bookmark'])) {
                        $html = $html . '<DL><p>' . PHP_EOL;
                    }
                } else {
                    if (!$this->flgFiles) {
                        $this->flgFiles = true;
                    }

                    if ($this->id === $data['parent_id']) {
                        $this->flg = true;
                    } else {
                        if ($this->isChildren) {
                            $html = $html . '</DL><p>' . PHP_EOL;
                            $this->isChildren = false;
                        }
                    }

                    $this->parentId = $data['parent_id'];
                    $html = $html . '<DT><A HREF="' . $data['url'] . '" ADD_DATE="' . strtotime($data['reg_date']) . '">' . $data['title'] . '</A>' . PHP_EOL;
                }

                break;

            case 'firefox':
                break;

            case 'safari':
                break;

            case 'ie':
                break;

            default:
                break;
        }

        return $html;
    }
}