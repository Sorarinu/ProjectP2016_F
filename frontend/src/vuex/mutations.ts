// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
import {Bookmark} from '../model/bookmark';
import {BookmarkSimilarity} from '../model/bookmark-similarity';
import {User} from '../model/user';
import {MutationTypes} from './mutation-types';
import {State} from './state';
import SIGN_IN = MutationTypes.SIGN_IN;
import SIGN_OUT = MutationTypes.SIGN_OUT;
import GET_BOOKMARK = MutationTypes.GET_BOOKMARK;
import ADD_BOOKMARK = MutationTypes.ADD_BOOKMARK;
import SET_BOOKMARK_OPEN_DIR = MutationTypes.SET_BOOKMARK_OPEN_DIR;
import SET_BOOKMARK_ERROR = MutationTypes.SET_BOOKMARK_ERROR;
import MOVE_BOOKMARK = MutationTypes.MOVE_BOOKMARK;
import DELETE_BOOKMARK = MutationTypes.DELETE_BOOKMARK;
import TOGGLE_CONTEXT_MENU = MutationTypes.TOGGLE_CONTEXT_MENU;
import SET_BOOKMARK_SEARCH_RES = MutationTypes.SET_BOOKMARK_SEARCH_RES;
import START_SEARCH = MutationTypes.START_SEARCH;
import OPEN_DELETE_DIALOG = MutationTypes.OPEN_DELETE_DIALOG;
import CLOSE_DELETE_DIALOG = MutationTypes.CLOSE_DELETE_DIALOG;
import OPEN_SEARCH_DIALOG = MutationTypes.OPEN_SEARCH_DIALOG;
import ADD_SELECT_BOOKMARK = MutationTypes.ADD_SELECT_BOOKMARK;
import CLOSE_UPLOAD_DIALOG = MutationTypes.CLOSE_UPLOAD_DIALOG;
import OPEN_UPLOAD_DIALOG = MutationTypes.OPEN_UPLOAD_DIALOG;
import CLOSE_SEARCH_DIALOG = MutationTypes.CLOSE_SEARCH_DIALOG;
import DELETE_SELECT_BOOKMARK = MutationTypes.DELETE_SELECT_BOOKMARK;
import RESET_SELECT_BOOKMARK = MutationTypes.RESET_SELECT_BOOKMARK;
import {MutationTree} from 'vuex';

const mutations: MutationTree<State> = {

    // user mutations------------------------------------
    [SIGN_IN]: (state: State, user: User) => {
        state.signInNow = true;
        state.user = user;
    },

    [SIGN_OUT]: (state: State) => {
        state.signInNow = false;
        state.user = new User('', '');
    },

    // ----------------------------------------------------

    // bookmarkRoot mutations ---------------------------------
    [GET_BOOKMARK]: (state: State, bookmark: Bookmark) => {
        state.bookmarkRoot = bookmark;
    },

    [ADD_BOOKMARK]: (state: State, bookmark: Bookmark) => {
        state.bookmarkRoot.addChild(bookmark);
    },

    [SET_BOOKMARK_ERROR]: (state: State, message: string) => {
        state.bookmarkComError = true;
        state.bookmarkComErrorMessage = message;
    },

    [SET_BOOKMARK_OPEN_DIR]: (state: State, dirID: number) => {
        state.openBookmarkDirId = dirID;
    },

    [MOVE_BOOKMARK]: (state: State, {from, to}) => {
        const fromBM = state.bookmarkRoot.search(from);
        const toBM = state.bookmarkRoot.search(to);

        fromBM.remove();
        toBM.addChild(fromBM);
    },

    [DELETE_BOOKMARK]: (state: State, id: number) => {
        const targetBM = state.bookmarkRoot.search(id);
        targetBM.remove();
    },

    // ----------------------------------------------------

    // bookmark search mutation --------------------------

    [START_SEARCH]: (state: State) => {
        state.bookmarkSimilarityRes = null;
    },

    [SET_BOOKMARK_SEARCH_RES]: (state: State, res: BookmarkSimilarity) => {
        state.bookmarkSimilarityRes = res;
    },

    // -----------------------------------------------------

    // ui mutations --------------------------------------
    [TOGGLE_CONTEXT_MENU]: (state: State, closer: () => void ) => {
        if (state.contextMenuCloser) {
            state.contextMenuCloser();
        }
        state.contextMenuCloser = closer;
    },

    [OPEN_DELETE_DIALOG]: (state: State) => {
        state.showBMDeleteDialog = true;
    },
    [CLOSE_DELETE_DIALOG]: (state: State) => {
        state.showBMDeleteDialog = false;
    },

    [OPEN_SEARCH_DIALOG]: (state: State) => {
        state.showSearchDialog = true;
    },
    [CLOSE_SEARCH_DIALOG]: (state: State) => {
        state.showSearchDialog = false;
    },

    [OPEN_UPLOAD_DIALOG]: (state: State) => {
        state.showUploadDialog = true;
    },
    [CLOSE_UPLOAD_DIALOG]: (state: State) => {
        state.showUploadDialog = false;
    },

    // ブックマーク選択系

    [ADD_SELECT_BOOKMARK]: (state: State, id: number) => {
        state.selectBMIds.push(id);
    },

    [DELETE_SELECT_BOOKMARK]: (state: State, id: number) => {
        const i = state.selectBMIds.indexOf(id);
        if (i >= 0) {
            state.selectBMIds.splice(i, 1);
        }
    },

    [RESET_SELECT_BOOKMARK]: (state: State) => {
        state.selectBMIds = [];
    },
};

export default mutations;
