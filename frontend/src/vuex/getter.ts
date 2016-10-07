import {State} from './store';
import {Bookmark} from '../model/bookmark';
/**
 * Created by namaz on 2016/09/26.
 */

// user state getter -----------------------------------

export function getSignInNow(state : State) : boolean {
    return state.signInNow;
}



// bookmark state getter --------------------------------

export function getBookmarkRoot(state : State) : Bookmark {
    return state.bookmark;
}

export function getBookmark(state : State , bmId : number) {
    return state.bookmark.searchAll(bmId);
}


