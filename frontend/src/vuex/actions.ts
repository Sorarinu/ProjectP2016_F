import {Action, Store} from '~vuex/index';
import {User} from '../model/user';
import {MutationTypes} from './mutation-types';
import {State} from './store';
import {ServiceFactory} from '../api/service-factory';
import {Bookmark} from '../model/bookmark';

/**
 * すべてのAction
 */
export class Actions {

    // user actions
    static signIn: Action<State> =
        ({dispatch}: any, user: User) => {
            dispatch(MutationTypes.SIGN_IN, user);
        };

    static signOut: Action<State> =
        (store: Store<State>) => {
            store.dispatch(MutationTypes.SIGN_OUT);
        };

    // bookmark Action
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
        }
}

