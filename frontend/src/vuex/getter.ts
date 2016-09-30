import {State} from './store';
/**
 * Created by namaz on 2016/09/26.
 */
export function getSignInNow(state : State) : boolean {
    return state.signInNow;
}
