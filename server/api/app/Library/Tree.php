<?php
/**
 * Created by PhpStorm.
 * User: Sorarinu
 * Date: 2016/10/07
 * Time: 16:14
 */

namespace app\Library;


class Tree
{
    public static function listToTree($list = array(), $idField = 'id', $parentField = 'parent_id')
    {
        if (!is_array($list)) {
            return false;
        }
        $tree = [];
        $index = [];

        foreach ($list as $value) {
            $id = $value[$idField];
            $pid = $value[$parentField];

            if (isset($index[$id])) {
                $value["bookmark"] = $index[$id]["bookmark"];
                $index[$id] = $value;
            } else {
                $index[$id] = $value;
            }

            if ($pid == 0) {
                $tree[] = &$index[$id];
            } else {
                $index[$pid]["bookmark"][] = &$index[$id];
            }
        }
        return $tree;
    }
}