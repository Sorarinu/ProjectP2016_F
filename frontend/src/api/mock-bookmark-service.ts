
import {BookmarkService} from './bookmark-service';
import {Bookmark} from '../model/bookmark';
/**
 * ブックマーク操作APIコールの実装
 * ローカルで完結するMock
 */
export class MockBookmarkService implements BookmarkService {

    /**
     * BookmarkRoot
     */
    rootBM: Bookmark;


    private PROCESS_TIME = 500;
    private STORAGE_KEY = 'Bookmark-data';

    constructor() {
        // bookmark初期化.
        localStorage.clear();
        const mockData = require('./mock-data/bookmark.json');
        this.rootBM = Bookmark.fromJSON(JSON.stringify(mockData.bookmark));
        this.saveLocalStorage();
    }

    postBookmark(bm: Bookmark, requestListenr: RequestListener): void {
        //　bookmarkをローカルストレージへ追加する処理.

        // bookmarkにIDを付与.
        // 本番ではサーバーからIDは与えられるが今回は時刻をIDにする
        const id = Date.now();
        bm.id = id;
        this.rootBM.addChild(bm);

        this.saveLocalStorage();

        //  応答
        setTimeout(() => {
            requestListenr.ok(bm);
        }, this.PROCESS_TIME);
    }

    getBookmarks(requestListenr: RequestListener): void {
        //localstorageからbookmark取り出して返す.
        const bookmark : Bookmark = Bookmark.fromJSON(localStorage.getItem(this.STORAGE_KEY));
        this.rootBM = bookmark;

        // 応答
        setTimeout(() => {
            requestListenr.ok(bookmark);
        }, this.PROCESS_TIME);

    }

    updateBookmark(bm: Bookmark, requestListenr: RequestListener): void {
        //置き換え
        var target = this.rootBM.searchAll(bm.id);
        target = bm;
        this.saveLocalStorage();

        // 応答
        setTimeout(() => {
            requestListenr.ok(bm);
        }, this.PROCESS_TIME);
    }

    deleteBookmark(bm: Bookmark, requestListenr: RequestListener): void {
        //削除
        var target = this.rootBM.searchAll(bm.id);
        target.remove();
        this.saveLocalStorage();

        // 応答
        setTimeout(() => {
            requestListenr.ok(bm);
        }, this.PROCESS_TIME);
    }


    private saveLocalStorage() {
        localStorage.setItem(this.STORAGE_KEY, Bookmark.toJSON(this.rootBM));
    }

}
