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

Vue.use(Vuex.install);

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

    // bookmark stateーーーーーーーーーーーーー

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
    bookmark : Bookmark;


    // state initializer
    constructor() {
        this.signInNow = false;
        this.user = new User('', '');
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

    // bookmark mutations ---------------------------------
    [GET_BOOKMARK] (state: State, bookmark: Bookmark) {
        state.bookmark = bookmark;
    },

    [ADD_BOOKMARK] (state: State, bookmark: Bookmark) {
        state.bookmark.addChild(bookmark);
    },

    [DELETE_BOOKMARK] (state: State, bookmark: Bookmark) {
        var tagrget = state.bookmark.search(bookmark.id);
        tagrget.remove();
    },

    [SET_BOOKMARK_ERROR] (state: State, message: string) {
        state.bookmarkComError = true;
        state.bookmarkComErrorMessage = message;
    },

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
