import {User} from '../model/user';
import * as $ from 'jquery';
import {ApiUrl} from './apiurl';
import {Service} from './service';



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
     * @param requestListener
     */
    signUp(requestListener: IRequestListener): void {

        // TODO:Defferとかつかってまともな書き方すること
        if (!this.user.validate()) {
            requestListener.failed('form data is not valid');
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
                this.loginNow = true;
                requestListener.ok(data);
            }
            // 登録失敗.
            if (data.status === 'NG') {
                requestListener.ng(data.message);
            }
        })
        .fail(() => requestListener.failed('Request Failed'));
    }

    /**
     * SignIn
     * @param requestListener
     */
    signIn(requestListener: IRequestListener): void {
        if (!this.user.validate()) {
            requestListener.failed('form data is not valid');
            return;
        }

        $.ajax({
            url: super.resolvePath(ApiUrl.SIGN_IN),
            dataType: 'json',
            method: 'GET',
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
        .fail(() => requestListener.failed('Request Failed'));
    }

    /**
     * SignOut
     * @param requestListener
     */
    signOut(requestListener: IRequestListener): void {
        // TODO:SignOut実処理実装
    }
}

