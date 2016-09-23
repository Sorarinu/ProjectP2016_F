import Component from 'vue-class-component';
import {UserService} from '../../service/userservice';
import router from '../../main';


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

    private userService : UserService;

    private passwordConfilm : string;
    private alertProp: {show: boolean, type: string, message: string};

    data() {

        this.userService = UserService.getInstance();

        this.alertProp = {
            show: false,
            type: 'info',
            message: 'sign-in-alert-message'
        };

        return {
            user : this.userService.user,
            login : this.userService.loginNow,
            passwordConfilm : this.passwordConfilm,
            alertProp : this.alertProp
        };
    }

    formValidate() : boolean {
        return [
            this.userService.user.validate(),
            this.userService.user.password === this.passwordConfilm
        ].every((x: boolean) => x);
    }

    signUp() : void {
        this.userService.signUp({
            ok: () => this.transitionHome(),
            ng: (message: string) => this.alert(message, 'danger'),
            failed: (message: string) => this.alert(message, 'danger')
        });
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
