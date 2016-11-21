/**
 * ミューテーションの操作一覧を文字定数で列挙する.
 */
export class MutationTypes {

}
export namespace MutationTypes {
    //user mutations
    export const SIGN_IN = 'SIGNIN';
    export const SIGN_OUT = 'SIGNOUT';

    //bookmarkRoot mutations
    export const ADD_BOOKMARK = 'ADD_BOOKMARK';
    export const GET_BOOKMARK = 'GET_BOOKMARK';
    export const UPDATE_BOOKMARK = 'UPDATE_BOOKMARK';
    export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
    export const SET_BOOKMARK_ERROR = 'SET_BOOKMARK_ERROR';
    export const SET_BOOKMARK_OPEN_DIR = 'SET_BOOKMARK_OPEN_DIR';

    export const MOVE_BOOKMARK = 'MOVE_BOOKMARK';


    export const SET_BOOKMARK_SEARCH_RES = 'SET_BOOKMARK_SEARCH_RES';

    //ui mutations
    export const TOGGLE_CONTEXT_MENU = 'SHOW_CONTEXT_MENU';

    export const OPEN_DELETE_DIALOG = 'OPEN_DELETE_DIALOG';
    export const CLOSE_DELETE_DIALOG = 'CLOSE_DELETE_DIALOG';

    export const OPEN_SEARCH_DIALOG = 'OPEN_SEARCH_DIALOG';
    export const CLOSE_SEARCH_DIALOG = 'CLOSE_SEARCH_DIALOG';


    export const OPEN_UPLOAD_DIALOG = 'OPEN_UPLOAD_DIALOG';
    export const CLOSE_UPLOAD_DIALOG = 'CLOSE_UPLOAD_DIALOG';

    export const ADD_SELECT_BOOKMARK = 'ADD_SELECT_BOOKMARK';
    export const DELETE_SELECT_BOOKMARK = 'DELETE_SELECT_BOOKMARK';
    export const RESET_SELECT_BOOKMARK = 'RESET_SELECT_BOOKMARK';
}
