import Component from 'vue-class-component';
import {User} from '../../model/user';
import {UserService} from '../../service/userservice';
import router from '../../main';

/**
 * SignIn Component
 */
require('./signin.scss');
@Component({
    template: require('./signin.jade'),
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

    signIn() : void {
        // this.userService.signIn({
        //     ok: (data: any) => {
        //         this.transitionHome();
        //     },
        //     ng: (message: string) => {
        //         this.alertProp.show = true;
        //         this.alertProp.type = 'danger';
        //         this.alertProp.message = message;
        //     },
        //     failed: (message: string) => {
        //         this.alertProp.show = true;
        //         this.alertProp.type = 'danger';
        //         this.alertProp.message = message;
        //     }
        // });
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
