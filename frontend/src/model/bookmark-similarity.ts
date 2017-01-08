import {Bookmark} from './bookmark';
/**
 * ブックマークの類似度を求めるAPIとの連携用クラス
 */
export class BookmarkSimilarity {

    searchWord : string;
    bookmark : BookmarkSimilarityValue[];

    /**
     *
     * @param bmf 検索対象フォルダのトップディレクトリBM
     * @param searchWord 類似度出す検索ワード
     */
    constructor(bmf : Bookmark , searchWord : string) {

        this.searchWord = searchWord;
        this.bookmark = [];

        // フォルダじゃないやつを検索用クラスに変換する
        const convert : (bm: Bookmark) => BookmarkSimilarityValue =
            (bm : Bookmark) => {
                return {
                    id : bm.id,
                    url : bm.url,
                    similar_flag : undefined,
                };
            };

        // 再帰して探索する関数
        const looper : (bm: Bookmark) => void =
            (bm: Bookmark) => {
                if (bm.folder) {
                    bm.bookmark.forEach(looper);
                } else {
                    this.bookmark.push(convert(bm));
                }
            };

        // 探索スタート
        bmf.bookmark.forEach(looper);

    }

    static fromJSON(jsonStr : string) : BookmarkSimilarity {
        return JSON.parse(jsonStr);
    }
}

export interface BookmarkSimilarityValue {
    id : number;
    url : string;
    similar_flag : boolean;
}
