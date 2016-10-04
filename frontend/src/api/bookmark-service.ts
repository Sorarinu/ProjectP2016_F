import {Bookmark} from '../model/bookmark';
/**
 * Bookmarkのデータを操作するAPIコールインターフェース.
 */
export interface BookmarkService {

    /**
     * Bookmarkを新規追加します.
     * @param bm
     * @param requestListener
     */
    postBookmark(bm: Bookmark, requestListener: RequestListener) : void;

    /**
     * Bookmarkを全取得します.
     * @param requestListener
     */
    getBookmarks(requestListener: RequestListener) : void;

    /**
     * 指定されたブックマークを更新します
     * @param bm
     * @param requestListener
     */
    updateBookmark(bm: Bookmark, requestListener: RequestListener) : void;

    /**
     * 指定されたブックマークを削除します
     * @param bm
     * @param requestListener
     */
    deleteBookmark(bm: Bookmark, requestListener: RequestListener) : void;
}
