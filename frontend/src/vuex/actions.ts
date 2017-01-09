import {ActionTree} from 'vuex';
import {ServiceFactory} from '../api/service-factory';
import {Bookmark} from '../model/bookmark';
import {BookmarkSimilarity} from '../model/bookmark-similarity';
import {User} from '../model/user';
import {MutationTypes} from './mutation-types';
import {State} from './state';

// ActionはComponentから呼び出され.
// 実行結果の唯一の副作用としてMutationの実行を行います.
// MutationはAction外で呼ぶことはできません.
// Mutationは単純なStateの状態変更で同期的である必要がありますが,Actionは非同期処理を内包できます.
const actions: ActionTree<State, State> = {
    /**
     * Init 仮ユーザーとしてサーバー側にSession登録する.
     */
    init: ({commit}) => {
        const service = ServiceFactory.getUserService();
        service.init({
            ok: (user: User) => {
                commit(MutationTypes.SIGN_IN, user);
            },
            failed: (message: string) => {
                return;
            },
        });
    },

    /**
     * SignInをコミットする
     * @param dispatch
     * @param user
     */
    signIn: ({commit}, user: User) => {
        commit(MutationTypes.SIGN_IN, user);
    },

    /**
     * SignOutをコミットする
     * @param store
     */
    signOut: ({commit}) => {
        commit(MutationTypes.SIGN_OUT);
    },

    /**
     * ブックマークをサーバーにアップロード
     * @param store
     * @param data
     */
    uploadBookmark: ({commit}, data: FormData) => {
        const service = ServiceFactory.getBookmarkService();
        service.uploadBookmark(data, {
            ok: (data: Bookmark) => {
                commit(MutationTypes.GET_BOOKMARK, data);
            },
            failed: (message: string) => {
                commit(MutationTypes.SET_BOOKMARK_ERROR, message);
            },
        });
    },

    /**
     * BookmarkをAPIコールで取得.
     * 取得したBookmarkをコミットする.
     * @param store
     */
    fetchBookmark: ({commit}) => {
        const service = ServiceFactory.getBookmarkService();
        service.getBookmarks({
            ok : (data: Bookmark) => {
                commit(MutationTypes.GET_BOOKMARK, data);
            },
            failed : (message: string ) => {
                commit(MutationTypes.SET_BOOKMARK_ERROR, message);
            },
        });
    },

    /**
     * ブックマークの現在開いているディレクトリのIDをコミットする.
     * @param store
     * @param dirID
     */
    openBookmarkDir: ({commit}, dirID: number) => {
        // Actions.selectBookmark(store, dirID);
        commit(MutationTypes.SET_BOOKMARK_OPEN_DIR, dirID);
    },

    addBookmark: ({commit}, {parent, bookmark}) => {
        commit(MutationTypes.ADD_BOOKMARK, bookmark);
    },

    /**
     * ブックマークを移動する.
     * @param store
     * @param from 移動するブックマークのid
     * @param to 移動先ブックマークのid (folder id)
     */
    moveBookmark: ({commit}, {from, to}) => {
        commit(MutationTypes.MOVE_BOOKMARK, {from, to});
    },

    /**
     * ブックマークを削除する.
     * @param store
     * @param id 削除対象ブックマークID
     */
    deleteBookmark: ({commit}, id: number) => {
        commit(MutationTypes.DELETE_BOOKMARK, id);
    },

    /**
     * ブックマークを単一選択状態にする
     * @param store
     * @param id
     */
    selectBookmark: ({commit}, id: number) => {
        commit(MutationTypes.RESET_SELECT_BOOKMARK);
        commit(MutationTypes.ADD_SELECT_BOOKMARK, id);
    },

    /**
     * ブックマークを選択状態にする
     * @param store
     * @param id
     */
    addSelectBookmark: ({state, commit}, id: number) => {
        // すでに選択しているブックマークは選択状態にしない.
        if (state.selectBMIds.indexOf(id) !== -1) {
            return;
        }

        // 親フォルダが選択状態にある場合一旦リセットする
        const parentId = state.bookmarkRoot.search(id).parent.id;
        if (state.selectBMIds.indexOf(parentId) !== -1) {
            commit(MutationTypes.RESET_SELECT_BOOKMARK);
        }

        commit(MutationTypes.ADD_SELECT_BOOKMARK, id);
    },

    /**
     * 選択状態にあるブックマークを全部削除し
     * 選択状態をリセットする
     * @param store
     */
    deleteSelectBookmark: ({state, commit}) => {
        state.selectBMIds.forEach((id: number) => {
            commit(MutationTypes.DELETE_BOOKMARK, id);
        });

        commit(MutationTypes.RESET_SELECT_BOOKMARK);
    },

    /**
     * ブックマークを類似度APIに問い合わせ検索する
     * @param store
     */
    searchBookmark: ({commit}, {bmf, searchWord}) => {

        commit(MutationTypes.START_SEARCH);

        const service = ServiceFactory.getBookmarkSimirarityService();
        service.search(searchWord, bmf, {
            ok : (data: BookmarkSimilarity) => {
                commit(MutationTypes.SET_BOOKMARK_SEARCH_RES, data);
            } ,
            failed : (message: String) => {
                commit(MutationTypes.SET_BOOKMARK_ERROR, message);
            },
        });
    },

    openBMDeleteDialog: ({commit}) => {
        commit(MutationTypes.OPEN_DELETE_DIALOG);
    },

    closeBMDeleteDialog: ({commit}) => {
        commit(MutationTypes.CLOSE_DELETE_DIALOG);
    },

    openSearchDialog: ({commit}) => {
        commit(MutationTypes.OPEN_SEARCH_DIALOG);
    },

    closeSearchDialog: ({commit}) => {
        commit(MutationTypes.CLOSE_SEARCH_DIALOG);
    },

    openUploadDialog: ({commit}) => {
        commit(MutationTypes.OPEN_UPLOAD_DIALOG);
    },

    closeUploadDialog: ({commit}) => {
        commit(MutationTypes.CLOSE_UPLOAD_DIALOG);
    },

    /**
     * コンテキストメニューの表示、非表示状態を切り替える.
     * @param store
     */
    toggleContextMenu: ({commit}, closer: () => void) => {
        commit(MutationTypes.TOGGLE_CONTEXT_MENU, closer);
    },
};

export default actions;
