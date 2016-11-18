import {State} from './store';
import {Bookmark} from '../model/bookmark';
/**
 * Vuex　すべてのgetter関数のエクスポート.
 */

// getterはstateの状態を取得する関数です.
// vueの算出プロパティのように考えるといいでしょう.
// stateに対して参照透過である必要があります.


// user state getter -----------------------------------

export function getSignInNow(state : State) : boolean {
    return state.signInNow;
}



// bookmarkRoot state getter --------------------------------

/**
 * StoreからBookmarkの親を得る.
 * @param state
 * @returns {Bookmark}
 */
export function getBookmarkRoot(state : State) : Bookmark {
    return state.bookmarkRoot;
}

/**
 * StoreのBookmarkが空かどうか?
 * @param state
 * @returns {boolean}
 */
export function bookmarkIsEmpty(state : State) : boolean {
    // root要素BM以外のBMが存在しない.
    return state.bookmarkRoot.getSize() === 1;
}

/**
 * 現在の開いているブックマークのディレクトリからrootまでの階層を配列で得ます.
 * @param state
 */
export function getBookmarkHierarchy(state: State) : Bookmark[] {
    const openID = state.openBookmarkDirId;

    const openBM = state.bookmarkRoot.search(openID);
    return openBM.getHierarchy();
}

/**
 * 表示すべきブックマークの１階層分を得ます.
 * @param state
 */
export function getShowBookmarks(state : State) : Bookmark[] {
    const dirID = state.openBookmarkDirId;
    return state.bookmarkRoot.search(dirID).bookmark;
}

export function getOpenDirId(state: State) : number {
    return state.openBookmarkDirId;
}


export function getSelectedBMIds(state : State) : number[] {
    return state.selectBMIds;
}

export function getSelectBMs(state : State) : Bookmark[] {
    const selectIds : number[] = getSelectedBMIds(state);
    return selectIds.map((id: number) => {
        return getBookmark(state, id);
    });
}

/**
 * Storeから指定したBookmarkを得る.
 * @param state
 * @param bmId
 * @returns {Bookmark}
 */
export function getBookmark(state : State , bmId : number) {
    return state.bookmarkRoot.searchAll(bmId);
}



export function getDeleteDialogShow(state : State) {
    return state.showBMDeleteDialog;
}

export function getSearchDialogShow(state : State) {
    return state.showSearchDialog;
}

export function getUploadDialogShow(state : State) {
    return state.showUploadDialog;
}

