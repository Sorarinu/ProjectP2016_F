/**
 * ミューテーションの操作一覧を文字定数で列挙する.
 */
export class MutationTypes {

}
export namespace MutationTypes {
    //user mutations
    export const SIGN_IN = 'SIGNIN';
    export const SIGN_OUT = 'SIGNOUT';

    //bookmark mutations
    export const ADD_BOOKMARK = 'ADD_BOOKMARK';
    export const GET_BOOKMARK = 'GET_BOOKMARK';
    export const UPDATE_BOOKMARK = 'UPDATE_BOOKMARK';
    export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
}
