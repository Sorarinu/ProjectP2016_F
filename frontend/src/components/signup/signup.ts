import Component from 'vue-class-component';
import {UserService} from '../../service/userservice';
import router from '../../main';
import {User} from '../../model/user';


/**
 * SignUpコンポーネント
 */
require('./signup.scss');
@Component({
    template: require('./signup.jade'),
    components: {
        bsInput : require('vue-strap').input ,
        alert : require('vue-strap').alert
    }
})
export class SignUp {

    private user: User;

    private passwordConfilm : string;

    private alertProp: {show: boolean, type: string, message: string};

    data() {


        this.alertProp = {
            show: false,
            type: 'info',
            message: 'sign-in-alert-message'
        };

        this.user = new User('', '');

        return {
            user : this.user,
            passwordConfilm : this.passwordConfilm,
            alertProp : this.alertProp
        };
    }

    formValidate() : boolean {
        return [
            this.user.validate(),
            this.user.password === this.passwordConfilm
        ].every((x: boolean) => x);
    }

    signUp() : void {
        // this.userService.signUp({
        //     ok: () => this.transitionHome(),
        //     ng: (message: string) => this.alert(message, 'danger'),
        //     failed: (message: string) => this.alert(message, 'danger')
        // });
    }

    alert(message: string, type : string) : void {
        this.alertProp.show = true;
        this.alertProp.type = type;
        this.alertProp.message = message;
    }

    transitionHome() : void {
        //TODO:Homeページへ遷移
        // メインのページ作ったら実装
        router.replace('index');
    }
}
