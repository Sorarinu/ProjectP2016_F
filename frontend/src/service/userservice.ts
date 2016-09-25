import {User} from '../model/user';
import * as $ from 'jquery';
import {ApiUrl} from './apiurl';
import {Service} from './service';


/**
 * ユーザーについて管理するサービスクラス.
 * SignUp,SignIn,SignOutの機能を提供.
 * リクエスト送るのが思いっきり$.ajaxと結合しててモック差し替えとか大変だけどまぁご愛敬
 * //TODO:CSRFのトークン
 */
export class UserService extends Service {

    /**
     * Login中かどうかを示します
     */
    loginNow: boolean;

    /**
     * User情報
     */
    user: User;

    // DIとかなくてサービスクラスのインスタンス使いまわし方がよくわからない
    // とらりあえずこうなりゃシングルトンだ！(´・ω・｀)
    // また色々調べて考える
    private static instance = new UserService();

    constructor() {
        super();
        console.log('UserService created!!');
        this.user = new User('', '');
        this.loginNow = false;
    }

    static getInstance() : UserService {
        if (this.instance == null) {
            this.instance = new UserService();
        }
        return this.instance;
    }


    /**
     * SingUpリクエストを送ります.
     * 成功ならSignInリクエストを送ります.
     * @param requestListener
     */
    signUp(requestListener: IRequestListener): void {

        // TODO:Defferとかつかっていけてる書き方すること
        if (!this.user.validate()) {
            requestListener.failed('Form data is not valid');
        }

        $.ajax({
            url: super.resolvePath(ApiUrl.SIGN_UP),
            dataType: 'json',
            method: 'POST',
            data: {
                email: this.user.email,
                password: this.user.password
            }
        })
        .done((data: any) => {
            // 登録成功.
            if (data.status === 'OK') {
                requestListener.ok(data);
                //ログイン成功で続けてSinginリクエスト送信.
                this.signIn(requestListener);
            }
            // 登録失敗.
            if (data.status === 'NG') {
                requestListener.ng(data.message);
            }
        })
        .fail(() => requestListener.failed('Signup Request Failed'));
    }

    /**
     * SignInリクエストを送りSignInします
     * @param requestListener
     */
    signIn(requestListener: IRequestListener): void {
        if (!this.user.validate()) {
            requestListener.failed('Form data is not valid');
            return;
        }

        $.ajax({
            url: super.resolvePath(ApiUrl.SIGN_IN),
            dataType: 'json',
            method: 'POST',
            data: {
                email: this.user.email,
                password: this.user.password
            }
        })
        .done((data : any) => {
            if (data.status === 'OK') {
                this.loginNow = true;
                requestListener.ok(data);
            }
            if (data.status === 'NG') {
                requestListener.ng(data.message);
            }
        })
        .fail(() => {
            this.loginNow = true;
            requestListener.failed('Signin Request Failed');
        });
    }

    /**
     * SignOut
     * @param requestListener
     */
    signOut(requestListener: IRequestListener): void {
        if (!this.loginNow) {
            return;
        }

        $.ajax({
            url: super.resolvePath(ApiUrl.SIGN_OUT),
            dataType: 'json',
            method: 'GET',
        })
        .done((data: any) => {
            if (data.status === 'OK') {
                this.loginNow = false;
                requestListener.ok(data);
            }
            if (data.status === 'NG') {
                requestListener.ng(data.message);
            }
        })
        .fail(() => requestListener.failed('Logout Request Failed'));
    }
}

