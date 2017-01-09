import {GetterTree} from 'vuex';
import {Bookmark} from '../model/bookmark';
import {BookmarkSimilarityValue} from '../model/bookmark-similarity';
import {User} from '../model/user';
import {State} from './state';
/**
 * Vuex　すべてのgetter関数のエクスポート.
 */

// getterはstateの状態を取得する関数です.
// vueの算出プロパティのように考えるといいでしょう.
// stateに対して参照透過である必要があります.

const getters: GetterTree<State, State> = {
    // user state getter -----------------------------------
    getCurrentUser(state: State): User {
        return state.user;
    },
    getSignInNow(state: State): boolean {
        return state.signInNow;
    },
    // bookmarkRoot state getter --------------------------------

    /**
     * StoreのBookmarkが空かどうか?
     * @param state
     * @returns {boolean}
     */
    bookmarkIsEmpty(state: State): boolean {
        // root要素BM以外のBMが存在しない.
        return state.bookmarkRoot.getSize() === 1;
    },
    /**
     * 現在の開いているブックマークのディレクトリからrootまでの階層を配列で得ます.
     * @param state
     */
    getBookmarkHierarchy(state: State): Bookmark[] {
        const openID = state.openBookmarkDirId;

        const openBM = state.bookmarkRoot.search(openID);
        return openBM.getHierarchy();
    },

    /**
     * 表示すべきブックマークの１階層分を得ます.
     * @param state
     */
    getShowBookmarks(state: State): Bookmark[] {
        const dirID = state.openBookmarkDirId;
        return state.bookmarkRoot.search(dirID).bookmark;
    },

    getSelectBMs(state: State): Bookmark[] {
        const selectIds: number[] = state.selectBMIds;
        return selectIds.map((id: number) => {
            return getBookmark(state, id);
        });
    },

    /**
     * ブックマーク検索結果でTrueと判定されたものを抽出する.
     * @param state
     * @returns {Bookmark[]}
     */
    getBookmarkSearchRes(state: State): Bookmark[] {

        if (state.bookmarkSimilarityRes == null) {
            return null;
        }

        const res: Bookmark[] = state.bookmarkSimilarityRes.bookmark
        .filter((v: BookmarkSimilarityValue) => {
            return v.similar_flag;
        }).map((v: BookmarkSimilarityValue) => {
            return getBookmark(state, v.id);
        });
        return res;
    },

    /**
     * Storeから指定したBookmarkを得る.
     * @param state
     * @param bmId
     * @returns {Bookmark}
     */
    getBookmark(state: State , bmId: number) {
        return state.bookmarkRoot.searchAll(bmId);
    },
};

function getBookmark(state: State, id: number): Bookmark {
    return state.bookmarkRoot.searchAll(id);
}

export default getters;
