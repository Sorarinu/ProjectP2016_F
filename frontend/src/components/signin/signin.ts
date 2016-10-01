import {User} from '../../model/user';
import {UserService} from '../../api/userservice';
import router from '../../main';
import {Component, Action} from '../../vue-typed/vue-typed';
import {Actions} from '../../vuex/actions';

/**
 * SignIn Component
 */
require('./signin.scss');
@Component({
    template: require('./signin.pug'),
    components: {
        bsInput: require('vue-strap').input ,
        alert: require('vue-strap').alert
    },
})
export class SignIn {

    private user : User;
    private alertProp: {show: boolean, type: string, message: string};

    data() {

        this.user = new User('', '');

        this.alertProp = {
            show: false,
            type: 'info',
            message: 'alert-message'
        };

        return {
            alertProp: this.alertProp,
            user: this.user
        };
    }

    @Action(Actions.signIn)
    signInCommit(user : User) {return; }


    signIn() : void {
        UserService.signIn({
            ok: (data: any) => {
                this.transitionHome();
            },
            ng: (message: string) => {
                this.alertProp.show = true;
                this.alertProp.type = 'danger';
                this.alertProp.message = message;
            },
            failed: (message: string) => {
                this.alertProp.show = true;
                this.alertProp.type = 'danger';
                this.alertProp.message = message;
            }
        }, this.user);

        // debug 強制ログイン成功
        this.signInCommit(this.user);
    }

    isValidFormData() : boolean {
        return this.user.validate();
    }

    transitionHome() : void {
        //TODO:Homeページへ遷移
        // メインのページ作ったら実装
        router.replace('index');
    }
}
