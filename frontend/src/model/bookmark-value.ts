import {Bookmark} from './bookmark';

/**
 * BookmarkモデルのJSON変換用中継値クラス.
 * {@link Bookmark} <=> {@link BookmarkValue} <=> JSON
 */
export class BookmarkValue {

    // プロパティ名はJSONの名前と同じ
    private bookmark_Id: number;
    private parent_id: number;
    private title: string;
    private detail: string;
    private url: string;
    private rag_date: string;
    private folder: boolean;
    private bookmark: BookmarkValue[];

    constructor(
        id: number,
        parent_id: number,
        title: string,
        detail: string,
        url: string,
        reg_date: string,
        folder: boolean,
        bookmark: BookmarkValue[],
    )　{
        this.bookmark_Id = id;
        this.parent_id = parent_id;
        this.title = title;
        this.detail = detail;
        this.url = url;
        this.rag_date = reg_date;
        this.folder  = folder;
        this.bookmark  = bookmark;
    }

    /**
     * JSON -> BookmarkValue（中継）　へ変換する
     * @param json
     * @returns {any}
     */
    static fromJSON(json: string): BookmarkValue[] {
        return JSON.parse(json);
    }

    /**
     * BookmarkValue(中継）　→　Bookmarkへ　変換する
     * トップレベルのBookmark配列に対してroot要素を付加する.
     * @param topBMVs　
     * @returns {Bookmark}
     */
    static toBM(topBMVs: BookmarkValue[]): Bookmark {
        // root
        const bmRoot = new Bookmark(true, Number.MAX_VALUE, null);
        bmRoot.title = 'TOP';

        // bmv -> bm 変換関数
        const bmvTobm = (bmv: BookmarkValue, parent: Bookmark) : Bookmark => {
            const res = new Bookmark(bmv.folder, bmv.bookmark_Id, parent);
            res.title = bmv.title;
            res.detail = bmv.detail;
            res.url = bmv.url;
            res.regDate = new Date(Date.parse(bmv.rag_date));

            if (bmv.folder && bmv.bookmark) {
                bmv.bookmark.forEach( (v: BookmarkValue) => {
                    const bm = bmvTobm(v, res);
                    res.addChild(bm);
                });
            }

            return res;
        };

        const bms: Bookmark[] = topBMVs.map((v: BookmarkValue) => {return bmvTobm(v, bmRoot); });
        bms.forEach((bm: Bookmark) => {
            bmRoot.addChild(bm);
        });

        return bmRoot;
    }

    /**
     * BM -> BookmarkValue (中継）　へ変換する
     * BMのルート要素を除外し子の配列とし、プロパティ名と型を変える
     * @param rootBM
     * @returns {Bookmark}
     */
    static fromBM(rootBM: Bookmark): BookmarkValue[] {
        // root除外.
        const bms = rootBM.bookmark;

        // bmv -> bm 変換関数.
        const bmTobmv = (bm: Bookmark) : BookmarkValue => {
            let chileds;
            if (bm.folder) {
                chileds = bm.bookmark.map(bmTobmv);
            }
            // parent は　id へ変える　トップレベル要素のBMはnullにする.
            // folder じゃないばあい　folder プロパティは　undefinedにする.
            return new BookmarkValue(
                bm.id,
                (bm.parent.id === Number.MAX_VALUE) ? null : bm.parent.id,
                bm.title,
                bm.detail,
                bm.url,
                bm.regDate.toDateString(),
                bm.folder,
                (bm.folder) ? chileds : undefined,
            );
        };

        return bms.map(bmTobmv);
    }

    /**
     * BookmarkValue(中継クラス）→　JSONへ変換する.
     * @param bmv
     * @returns {string}
     */
    static toJSON(bmv: BookmarkValue[]): string {
        return JSON.stringify(bmv);
    }
}
