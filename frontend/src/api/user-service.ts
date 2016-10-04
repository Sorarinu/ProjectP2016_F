import {User} from '../model/user';
/**
 * ユーザーについてのAPIコールのインターフェース.
 * サインアップ、サインイン、サインアウトとか
 */
export interface UserService {
    /**
     * サインアップします.
     * サインアップに成功するとそのままsingInの処理が走ります.
     * @param requestListener
     * @param user
     */
    signUp(requestListener: RequestListener, user: User) : void;

    /**
     * サインインします.
     * @param requestListener
     * @param user
     */
    signIn(requestListener: RequestListener, user: User) : void;

    /**
     * サインアウトします.
     * @param requestListener
     */
    signOut(requestListener: RequestListener) : void;
}
