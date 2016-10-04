import {Action, Store} from '~vuex/index';
import {User} from '../model/user';
import {MutationTypes} from './mutation-types';
import {State} from './store';
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
}

