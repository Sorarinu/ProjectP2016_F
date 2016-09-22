import {User} from '../model/user';
import * as $ from 'jquery';
import SIGN_UP = apiUrl.SIGN_UP;


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
        // TODO:ボタン連打の対策くらいすること

        if (!this.user.validate()) {
            return;
        }

        $.ajax({
            url: super.resolvePath(SIGN_UP),
            dataType: 'json',
            method: 'POST',
            data: {
                email: this.user.email,
                password: this.user.password,
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
            });
            //TODO:まともなメッセージ返す
            //.fail(() => requestListener.failed('failed'));
    }

    /**
     * SignIn
     * @param requestListener
     */
    signIn(requestListener: IRequestListener): void {
        // TODO:SignIn実処理実装

    }

    /**
     * SignOut
     * @param requestListener
     */
    signOut(requestListener: IRequestListener): void {
        // TODO:SignOut実処理実装
    }
}

