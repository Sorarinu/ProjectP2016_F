import {User} from '../model/user';
import * as $ from 'jquery';
import {ApiUrl} from './apiurl';


/**
 * ユーザーについてのAPIコール機能提供.
 * SignUp,SignIn,SignOutの機能を提供.
 * リクエスト送るのが思いっきり$.ajaxと結合しててモック差し替えとか大変だけどまぁご愛敬
 * TODO:CSRFのトークン
 */
export class UserService {

    /**
     * SingUpリクエストを送ります.
     * 成功ならSignInリクエストを送ります.
     * @param requestListener
     * @param user
     */
    static signUp(requestListener: RequestListener, user: User) : void {
        Object.freeze(user);

        if (!user.validate()) {
            requestListener.failed('Form data is not valid');
            return;
        }

        $.ajax({
            url: ApiUrl.resolvePath(ApiUrl.SIGN_UP),
            dataType: 'json',
            method: 'POST',
            data: {
                email: user.email,
                password: user.password
            }
        })
        .done((data: any) => {
            // 登録成功.
            if (data.status === 'OK') {
                this.signIn(requestListener, user);
            }
            // 登録失敗.
            if (data.status === 'NG') {
                requestListener.ng(data.message);
            }
        })
        .fail((xhr) => requestListener.failed((xhr.status) + ': SingUp Request Failed'));

    }

    /**
     * SignInリクエストを送りSignInします
     * @param requestListener
     * @param user
     */
    static signIn(requestListener: RequestListener, user: User): void {
        Object.freeze(user);

        if (!user.validate()) {
            requestListener.failed('Form data is not valid');
            return;
        }

        $.ajax({
            url: ApiUrl.resolvePath(ApiUrl.SIGN_IN),
            dataType: 'json',
            method: 'POST',
            data: {
                email: user.email,
                password: user.password
            }
        })
        .done((data : any) => {
            if (data.status === 'OK') {
                requestListener.ok(data);
            }
            if (data.status === 'NG') {
                requestListener.ng(data.message);
            }
        })
        .fail((xhr) => {
            requestListener.failed((xhr.status) + ': SingIn Request Failed');
        });
    }

    /**
     * SignOut
     * @param requestListener
     */
    static signOut(requestListener: RequestListener): void {
        $.ajax({
            url: ApiUrl.resolvePath(ApiUrl.SIGN_OUT),
            dataType: 'json',
            method: 'GET',
        })
        .done((data: any) => {
            if (data.status === 'OK') {
                requestListener.ok(data);
            }
            if (data.status === 'NG') {
                requestListener.ng(data.message);
            }
        })
        .fail((xhr) => requestListener.failed((xhr.status) + ': SingOut Request Failed'));
    }
}

