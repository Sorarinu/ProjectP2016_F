import Vue = require('vue');
import Vuex = require('vuex');
import {User} from '../model/user';
import {MutationTree} from '~vuex/index';
import {MutationTypes} from './mutation-types';
import {Bookmark} from '../model/bookmark';
import SIGN_IN = MutationTypes.SIGN_IN;
import SIGN_OUT = MutationTypes.SIGN_OUT;
import GET_BOOKMARK = MutationTypes.GET_BOOKMARK;
import ADD_BOOKMARK = MutationTypes.ADD_BOOKMARK;
import DELETE_BOOKMARK = MutationTypes.DELETE_BOOKMARK;
import SET_BOOKMARK_ERROR = MutationTypes.SET_BOOKMARK_ERROR;
import SET_BOOKMARK_OPEN_DIR = MutationTypes.SET_BOOKMARK_OPEN_DIR;
import MOVE_BOOKMARK = MutationTypes.MOVE_BOOKMARK;
import TOGGLE_CONTEXT_MENU = MutationTypes.TOGGLE_CONTEXT_MENU;
import RESET_SELECT_BOOKMARK = MutationTypes.RESET_SELECT_BOOKMARK;
import ADD_SELECT_BOOKMARK = MutationTypes.ADD_SELECT_BOOKMARK;
import DELETE_SELECT_BOOKMARK = MutationTypes.DELETE_SELECT_BOOKMARK;
import OPEN_DELETE_DIALOG = MutationTypes.OPEN_DELETE_DIALOG;
import CLOSE_DELETE_DIALOG = MutationTypes.CLOSE_DELETE_DIALOG;
import CLOSE_SEARCH_DIALOG = MutationTypes.CLOSE_SEARCH_DIALOG;
import OPEN_SEARCH_DIALOG = MutationTypes.OPEN_SEARCH_DIALOG;
import OPEN_UPLOAD_DIALOG = MutationTypes.OPEN_UPLOAD_DIALOG;
import CLOSE_UPLOAD_DIALOG = MutationTypes.CLOSE_UPLOAD_DIALOG;
import SET_BOOKMARK_SEARCH_RES = MutationTypes.SET_BOOKMARK_SEARCH_RES;
import {BookmarkSimilarity} from '../model/bookmark-similarity';

Vue.use(Vuex.install);

// debug setting.
// TODO: ビルド環境に応じて変わるように
const debug = true;
Vue.config.debug = debug;

// root state object
// each Vuex instance is just a single state tree.
export class State {

    // user stateーーーーーーーーーーーーーー

    /**
     * サインイン中かどうか
     */
    signInNow : boolean;

    /**
     * ログイン中のユーザー情報
     */
    user : User;

    // bookmarkRoot stateーーーーーーーーーーーーー

    /**
     * ブックマーク処理通信にエラーがあるか
     */
    bookmarkComError : boolean;

    /**
     * ブックマーク通信処理のエラーメッセージ
     */
    bookmarkComErrorMessage : string;

    /**
     * ブックマーク
     */
    bookmarkRoot : Bookmark;

    /**
     * 開くブックマークのディレクトリID
     */
    openBookmarkDirId : number;


    bookmarkSimilarityRes : BookmarkSimilarity;


    // ui state ---------
    selectBMIds : number[];

    showBMDeleteDialog : boolean;
    showSearchDialog : boolean;
    showUploadDialog : boolean;

    /**
     * 今開いているコンテキストメニューを閉じる関数.
     */
    contextMenuCloser : () => void;


    // state initializer
    constructor() {
        // user
        this.signInNow = false;
        this.user = new User('', '');

        // bookmark
        this.bookmarkRoot = new Bookmark(
            true,
            Number.MAX_VALUE,
            null
        );

        this.bookmarkSimilarityRes = new BookmarkSimilarity(this.bookmarkRoot, 'hoge');

        this.openBookmarkDirId = Number.MAX_VALUE;

        this.showBMDeleteDialog = false;
        this.showSearchDialog = false;
        this.showUploadDialog = false;

        this.selectBMIds = [];
        this.selectBMIds.push(Number.MAX_VALUE);
    }
}

const state = new State();

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations : MutationTree<State> = {

    // user mutations------------------------------------
    [SIGN_IN] (state: State, user: User) {
        state.signInNow = true;
        state.user = user;
    },

    [SIGN_OUT] (state: State) {
        state.signInNow = false;
        state.user = new User('', '');
    },

    // ----------------------------------------------------

    // bookmarkRoot mutations ---------------------------------
    [GET_BOOKMARK] (state: State, bookmark: Bookmark) {
        state.bookmarkRoot = bookmark;
    },

    [ADD_BOOKMARK] (state: State, bookmark: Bookmark) {
        state.bookmarkRoot.addChild(bookmark);
    },


    [SET_BOOKMARK_ERROR] (state: State, message: string) {
        state.bookmarkComError = true;
        state.bookmarkComErrorMessage = message;
    },

    [SET_BOOKMARK_OPEN_DIR] (state: State, dirID: number) {
        state.openBookmarkDirId = dirID;
    },

    [MOVE_BOOKMARK] (state: State, from: number, to: number) {
        const fromBM = state.bookmarkRoot.search(from);
        const toBM = state.bookmarkRoot.search(to);

        fromBM.remove();
        toBM.addChild(fromBM);
    },

    [DELETE_BOOKMARK] (state: State, id: number) {
        const targetBM = state.bookmarkRoot.search(id);
        targetBM.remove();
    },

    // ----------------------------------------------------


    // bookmark search mutation --------------------------

    [SET_BOOKMARK_SEARCH_RES] (state: State, res: BookmarkSimilarity) {
        state.bookmarkSimilarityRes = res;
    },

    // -----------------------------------------------------

    // ui mutations --------------------------------------
    [TOGGLE_CONTEXT_MENU] (state: State , closer: () => void ) {
        if (state.contextMenuCloser) {
           state.contextMenuCloser();
        }
        state.contextMenuCloser = closer;
    },


    [OPEN_DELETE_DIALOG] (state: State) {
        state.showBMDeleteDialog = true;
    },
    [CLOSE_DELETE_DIALOG] (state: State) {
        state.showBMDeleteDialog = false;
    },

    [OPEN_SEARCH_DIALOG] (state: State) {
        state.showSearchDialog = true;
    },
    [CLOSE_SEARCH_DIALOG] (state: State) {
        state.showSearchDialog = false;
    },


    [OPEN_UPLOAD_DIALOG] (state: State) {
        state.showUploadDialog = true;
    },
    [CLOSE_UPLOAD_DIALOG] (state: State) {
        state.showUploadDialog = false;
    },

    // ブックマーク選択系

    [ADD_SELECT_BOOKMARK] (state: State , id : number) {
        state.selectBMIds.push(id);
    },

    [DELETE_SELECT_BOOKMARK] (state : State , id : number) {
        const i = state.selectBMIds.indexOf(id);
        if (i >= 0) {
            state.selectBMIds.$remove(i);
        }
    },

    [RESET_SELECT_BOOKMARK] (state: State) {
        state.selectBMIds = [];
    }

    // --------------
};


// A Vuex instance is created by combining the state, the actions,
// and the mutations. Because the actions and mutations are just
// functions that do not depend on the instance itself, they can
// be easily tested or even hot-reloaded (see counter-hot example).
export default new Vuex.Store({
    state: state,
    mutations: mutations,
    strict: debug,
});
