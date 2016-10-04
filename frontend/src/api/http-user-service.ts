import {User} from '../model/user';
import * as $ from 'jquery';
import {ApiUrl} from './apiurl';
import {UserService} from './user-service';


/**
 * ユーザーについてのAPIコール機能提供.
 * 実際にサーバーにつなげる
 * TODO:CSRFのトークン
 * TODO:Failed時処理もう少し詳しく.
 */
export class HttpUserService implements UserService {

    /**
     * SingUpリクエストを送ります.
     * 成功ならSignInリクエストを送ります.
     * @param requestListener
     * @param user
     */
    signUp(requestListener: RequestListener, user: User) : void {
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
        })
        .fail((xhr) => requestListener.failed((xhr.status) + ': SingUp Request Failed'));

    }

    /**
     * SignInリクエストを送りSignInします
     * @param requestListener
     * @param user
     */
    signIn(requestListener: RequestListener, user: User): void {
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
        })
        .fail((xhr) => {
            requestListener.failed((xhr.status) + ': SingIn Request Failed');
        });
    }

    /**
     * SignOut
     * @param requestListener
     */
    signOut(requestListener: RequestListener): void {
        $.ajax({
            url: ApiUrl.resolvePath(ApiUrl.SIGN_OUT),
            dataType: 'json',
            method: 'GET',
        })
        .done((data: any) => {
            if (data.status === 'OK') {
                requestListener.ok(data);
            }
        })
        .fail((xhr) => requestListener.failed((xhr.status) + ': SingOut Request Failed'));
    }
}

