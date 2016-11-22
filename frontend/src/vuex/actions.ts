import {Action, Store} from '~vuex/index';
import {User} from '../model/user';
import {MutationTypes} from './mutation-types';
import {State} from './store';
import {ServiceFactory} from '../api/service-factory';
import {Bookmark} from '../model/bookmark';
import {BookmarkSimilarity} from '../model/bookmark-similarity';

/**
 * Vuex, すべてのAction
 */
export class Actions {

    // ActionはComponentから呼び出され.
    // 実行結果の唯一の副作用としてMutationの実行を行います.
    // MutationはAction外で呼ぶことはできません.
    // Mutationは単純なStateの状態変更で同期的である必要がありますが,Actionは非同期処理を内包できます.

    /**
     * SignInをコミットする
     * @param dispatch
     * @param user
     */
    static signIn: Action<State> =
        ({dispatch}: any, user: User) => {
            dispatch(MutationTypes.SIGN_IN, user);
        };

    /**
     * SignOutをコミットする
     * @param store
     */
    static signOut: Action<State> =
        (store: Store<State>) => {
            store.dispatch(MutationTypes.SIGN_OUT);
        };


    /**
     * ブックマークをサーバーにアップロード
     * @param store
     * @param data
     */
    static uploadBookmark: Action<State> =
        (store: Store<State>, data: FormData) => {
            const service = ServiceFactory.getBookmarkService();
            service.uploadBookmark(data, {
                ok: (data: Bookmark) => {
                    store.dispatch(MutationTypes.GET_BOOKMARK, data);
                },
                failed: (message: string) => {
                    store.dispatch(MutationTypes.SET_BOOKMARK_ERROR, message);
                }
            });
        };

    /**
     * BookmarkをAPIコールで取得.
     * 取得したBookmarkをコミットする.
     * @param store
     */
    static fetchBookmark: Action<State> =
        (store: Store<State>) => {
            const service = ServiceFactory.getBookmarkService();
            service.getBookmarks({
                ok : (data: Bookmark) => {
                    store.dispatch(MutationTypes.GET_BOOKMARK, data);
                },
                failed : (message: string ) => {
                    store.dispatch(MutationTypes.SET_BOOKMARK_ERROR, message);
                }
            });
        };

    /**
     * ブックマークの現在開いているディレクトリのIDをコミットする.
     * @param store
     * @param dirID
     */
    static openBookmarkDir: Action<State> =
        (store: Store<State>, dirID: number) => {
            // Actions.selectBookmark(store, dirID);
            store.dispatch(MutationTypes.SET_BOOKMARK_OPEN_DIR, dirID);
        };


    static addBookmark: Action<State> =
        (store: Store<State>, parent: Bookmark, bookmark: Bookmark) => {
            store.dispatch(MutationTypes.ADD_BOOKMARK, bookmark);
        };

    /**
     * ブックマークを移動する.
     * @param store
     * @param from 移動するブックマークのid
     * @param to 移動先ブックマークのid (folder id)
     */
    static moveBookmark: Action<State> =
        (store: Store<State>, from: number , to: number) => {
            store.dispatch(MutationTypes.MOVE_BOOKMARK, from, to);
        };

    /**
     * ブックマークを削除する.
     * @param store
     * @param id 削除対象ブックマークID
     */
    static deleteBookmark: Action<State> =
        (store: Store<State>, id: number) => {
            store.dispatch(MutationTypes.DELETE_BOOKMARK, id);
        };

    /**
     * ブックマークを単一選択状態にする
     * @param store
     * @param id
     */
    static selectBookmark : Action<State> =
        (store: Store<State>, id: number) => {
            store.dispatch(MutationTypes.RESET_SELECT_BOOKMARK);
            store.dispatch(MutationTypes.ADD_SELECT_BOOKMARK, id);
        };

    /**
     * ブックマークを選択状態にする
     * @param store
     * @param id
     */
    static addSelectBookmark: Action<State> =
        (store: Store<State>, id: number) => {
            // すでに選択しているブックマークは選択状態にしない.
            if (store.state.selectBMIds.indexOf(id) !== -1) {
                return;
            }

            // 親フォルダが選択状態にある場合一旦リセットする
            const parentId = store.state.bookmarkRoot.search(id).parent.id;
            if (store.state.selectBMIds.indexOf(parentId) !== -1) {
                store.dispatch(MutationTypes.RESET_SELECT_BOOKMARK);
            }

            store.dispatch(MutationTypes.ADD_SELECT_BOOKMARK, id);
        };

    /**
     * 選択状態にあるブックマークを全部削除し
     * 選択状態をリセットする
     * @param store
     */
    static deleteSelectBookmark: Action<State> =
        (store: Store<State>) => {
            store.state.selectBMIds.forEach((id: number) => {
                store.dispatch(MutationTypes.DELETE_BOOKMARK, id);
            });

            store.dispatch(MutationTypes.RESET_SELECT_BOOKMARK);
        };

    /**
     * ブックマークを類似度APIに問い合わせ検索する
     * @param store
     */
    static searchBookmark : Action<State> =
        (store: Store<State>, bmf: Bookmark , searchWord: string) => {
            const service = ServiceFactory.getBookmarkSimirarityService();
            service.search(searchWord, bmf, {
                ok : (data: BookmarkSimilarity) => {
                    store.dispatch(MutationTypes.SET_BOOKMARK_SEARCH_RES, data);
                } ,
                failed : (message: String) => {
                    store.dispatch(MutationTypes.SET_BOOKMARK_ERROR, message);
                }
            });
        }



    static openBMDeleteDialog: Action<State> =
        (store: Store<State>) => {
            store.dispatch(MutationTypes.OPEN_DELETE_DIALOG);
        };

    static closeBMDeleteDialog: Action<State> =
        (store: Store<State>) => {
            store.dispatch(MutationTypes.CLOSE_DELETE_DIALOG);
        };

    static openSearchDialog: Action<State> =
        (store: Store<State>) => {
            store.dispatch(MutationTypes.OPEN_SEARCH_DIALOG);
        };

    static closeSearchDialog: Action<State> =
        (store: Store<State>) => {
            store.dispatch(MutationTypes.CLOSE_SEARCH_DIALOG);
        };

    static openUploadDialog: Action<State> =
        (store: Store<State>) => {
            store.dispatch(MutationTypes.OPEN_UPLOAD_DIALOG);
        };

    static closeUploadDialog: Action<State> =
        (store: Store<State>) => {
            store.dispatch(MutationTypes.CLOSE_UPLOAD_DIALOG);
        };

    /**
     * コンテキストメニューの表示、非表示状態を切り替える.
     * @param store
     */
    static toggleContextMenu : Action<State> =
        (store: Store<State>, closer: () => void) => {
            store.dispatch(MutationTypes.TOGGLE_CONTEXT_MENU, closer);
        }
}

