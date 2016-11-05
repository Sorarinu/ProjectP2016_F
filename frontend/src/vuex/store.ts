import Vue = require('vue');
import Vuex = require('vuex');
import {User} from '../model/user';
import {MutationTree} from '~vuex/index';
import {MutationTypes} from './mutation-types';
import SIGN_IN = MutationTypes.SIGN_IN;
import SIGN_OUT = MutationTypes.SIGN_OUT;
import GET_BOOKMARK = MutationTypes.GET_BOOKMARK;
import ADD_BOOKMARK = MutationTypes.ADD_BOOKMARK;
import DELETE_BOOKMARK = MutationTypes.DELETE_BOOKMARK;
import {Bookmark} from '../model/bookmark';
import SET_BOOKMARK_ERROR = MutationTypes.SET_BOOKMARK_ERROR;
import SET_BOOKMARK_OPEN_DIR = MutationTypes.SET_BOOKMARK_OPEN_DIR;
import MOVE_BOOKMARK = MutationTypes.MOVE_BOOKMARK;

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


    // state initializer
    constructor() {
        this.signInNow = false;
        this.user = new User('', '');

        this.bookmarkRoot = new Bookmark(
            true,
            Number.MAX_VALUE,
            null
        );
        this.openBookmarkDirId = Number.MAX_VALUE;
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

    [DELETE_BOOKMARK] (state: State, bookmark: Bookmark) {
        var tagrget = state.bookmarkRoot.search(bookmark.id);
        tagrget.remove();
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
    }

    // ----------------------------------------------------
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
