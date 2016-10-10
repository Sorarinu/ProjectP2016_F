import {Action, Store} from '~vuex/index';
import {User} from '../model/user';
import {MutationTypes} from './mutation-types';
import {State} from './store';
import {ServiceFactory} from '../api/service-factory';
import {Bookmark} from '../model/bookmark';

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
            store.dispatch(MutationTypes.SET_BOOKMARK_OPEN_DIR, dirID);
        };

}

