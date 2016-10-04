/**
 * 隣接リストモデルで表現されるデータ配列を木構造のように扱っていくための汎用を提供する
 *
 * idと親のIDを持つ
 *
 *
 * Dosen't work ,  Don't use
 *
 */

interface TreeElement {
    id: number;
    parentId: number;
}

class TreeList<T extends TreeElement> {

    private data : TreeElement[];

    constructor() {
        this.data = new Array();
    }

    add(element: T) : boolean {

        return false;
    }
}
