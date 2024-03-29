import * as $ from 'jquery';
import {User} from '../model/user';
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
    public signUp(requestListener: RequestListener, user: User): void {
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
                password: user.password,
            },
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
     * Initしてログインしてるか確認.
     * @param requestListener
     */
    public init(requestListener: RequestListener): void {
        $.ajax({
            url: ApiUrl.resolvePath(ApiUrl.INIT),
            dataType: 'json',
            method: 'GET',
        })
        .done((data: any) => {
            if (!data.logined) {
                return;
            }

            const user = new User(data.email, '');
            requestListener.ok(user);
        });
    }

    /**
     * SignInリクエストを送りSignInします
     * @param requestListener
     * @param user
     */
    public signIn(requestListener: RequestListener, user: User): void {
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
                password: user.password,
            },
        })
        .done((data: any) => {
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
    public signOut(requestListener: RequestListener): void {
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

