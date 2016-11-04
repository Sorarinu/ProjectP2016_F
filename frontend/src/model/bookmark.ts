import {BookmarkValue} from './bookmark-value';

/**
 * Bookmarkデータモデル
 */
export class Bookmark implements Validation {

    /**
     * BookmarkリソースID
     * このIDを元にputやdeleteを送るURIを決定します.
     */
    id : number;

    /**
     * このブックマークが所属する親フォルダの参照
     * ルート要素であればnullです.
     */
    parent : Bookmark;

    /**
     * ブックマークのタイトル（表題）
     * ページタイトルだったりフォルダ名だったり
     */
    title : string;

    /**
     * ブックマーク詳細
     * ページの概要だったり、フォルダの内容説明だったり
     */
    detail : string;

    /**
     * ブックマークのリンク先URL
     * フォルダの場合この値は空文字になります.
     */
    url : string;

    /**
     * ブックマークが登録された日
     */
    regDate : Date;

    /**
     * このインスタンスがブックマークフォルダであるかどうか
     * フォルダならばTRUE
     */
    folder : boolean;

    /**
     * ブックマークフォルダであれば子要素を持つので.
     * フォルダではない場合このプロパティはnull
     */
    bookmark : Bookmark[];

    /**
     * Bookmarkモデルインスタンスを作成.
     *
     * @param folder フォルダーかどうか　フォルダーならtrue
     * @param id ブックマークリソースIDを指定
     * @param parentId 親のフォルダのリソースID
     */
    constructor (folder: boolean , id: number , parent: Bookmark) {
        this.id = id;
        this.parent = parent;
        this.title = '';
        this.detail = '';
        this.url = '';
        this.regDate = new Date();
        this.folder = folder;
        this.bookmark = (folder) ? new Array() : null;
    }

    /**
     * Bookmarkモデルの文字列表現を規定する.
     * @returns {string}
     */
    toString() : string {
        // 必要になるまではJSONでいい
        return JSON.stringify(this);
    };

    /**
     * BookmarkをJSONへ変換する.
     * @param rootBM BookmarkRoot要素
     * @returns {string}
     */
    static toJSON(rootBM: Bookmark) : string {
        // JSON値用クラスへ変換.
        const bookmarkValues = BookmarkValue.fromBM(rootBM);
        // 値用クラスをJSONへ変換.
        return BookmarkValue.toJSON(bookmarkValues);
    };

    /**
     * JSON文字列をBookmarkにパースします.
     * @param jsonStr
     */
    static fromJSON(jsonStr: string) : Bookmark {
        // JSONを値用クラスにパース.
        const bookmarkValues = BookmarkValue.fromJSON(jsonStr);
        // 値用クラスをブックマークインスタンスへ
        return BookmarkValue.toBM(bookmarkValues);
    }

    /**
     * このブックマークが有効であるかどうかチェックします.
     * @returns {boolean}
     */
    validate() {
        //TODO: そのうち実装.
        return true;
    }

    /**
     * Bookmarkの個数を得ます.ただのブックマークに対してやっても１しかきませんが
     * フォルダに対して実行した場合この要素が持つ子の数が得られます.
     *
     * @return {number} このブックマークが持つブックマークの数.
     */
    getSize() : number {
        if (this.folder === false) {
            return 1;
        }
        return this.bookmark
        .map( (bm: Bookmark) => { return bm.getSize(); })
        .reduce((x: number, y: number) => { return x + y; }, 1);
    }

    /**
     * 親を得ます.
     */
    getRoot() : Bookmark {
        var bm : Bookmark = this;
        // 親を辿って着くまで探す.
        // 仕様: ルート要素のparentはnull
        while (bm.parent !== null) {
            bm = this.parent;
        }
        return bm;
    }

    /**
     * 与えられたBMを子に追加します.
     *
     * 与えたBMのparentがnullであった場合呼び出し元インスタンスの子要素として追加されます.
     *
     * BMのparentと呼び出し元インスタンスが異なっていた場合は
     * parentのidを元にroot要素から一致するparentを探しだしその子要素として追加します.
     *
     * @param bm 追加するBM.
     *
     */
    addChild(bm: Bookmark) : void {

        // parentが指定されていないならこのインスタンスの子要素についか
        if (!bm.parent) {
            bm.parent = this;
            this.bookmark.push(bm);
            return;
        }

        // parentが指定されているなら一致するところへ追加
        if (bm.parent === this) {
            this.bookmark.push(bm);
        } else {
            const parent = this.searchAll(bm.parent.id);
            if (parent) {
                parent.bookmark.push(bm);
            } else {
                throw Error('ブックマーク追加エラー:' + bm.parent.id + 'このIDを持つ親はありません.');
            }
        }
    }

    /**
     * このブックマークを削除（全体のツリーから除外）します
     */
    remove() : void {
        if (!this.parent) {
            throw Error('ブックマーク削除エラー: root要素は消せません.');
        }
        var index: number = this.parent.bookmark.indexOf(this);
        this.parent.bookmark.splice(index, 1);
    }

    /**
     * 自分及び自分の子から指定されたIDを持つブックマークを探します.
     * 存在しなかった場合undefined.
     * @param id 検索対象のブックマークID
     *
     * @return Bookmark
     */
    search(id: number) : Bookmark {

        // 一致したら返す
        if ( this.id === id ) {
            return this;
        }


        // フォルダじゃないなら下の階層はないから探索を切る
        if (this.folder === false) {
            return undefined;
        }

        // フォルダに対して
        if (this.bookmark) {
            for (var i = 0; i < this.bookmark.length; i++) {
                // 深さ優先探索
                var ret = this.bookmark[i].search(id);
                if (ret) {
                    return ret;
                }
            }
        }

        return undefined;
    }

    /**
     * rootまでの階層を得る
     */
    getHierarchy() : Bookmark[] {
        const hierarchy : Bookmark[] = [];
        var tmp : Bookmark = this;
        // rootまでの親を順繰りに辿って配列に入れていく.
        do {
            hierarchy.push(tmp);
        }while ((tmp = (tmp.parent)) !== null);

        // [0] root -> ... -> this になるように順番変える.
        return hierarchy.reverse();
    }

    /**
     * Bookmark全体から指定されたIDを持つブックマークを探します
     * 存在しない場合undefinedが返ります.
     * @param id
     */
    searchAll(id: number) : Bookmark {
        return this.getRoot().search(id);
    }

}
