import router from '../../main';
import {User} from '../../model/user';
import {Component, Action} from '../../vue-typed/vue-typed';
import {Actions} from '../../vuex/actions';
import {ServiceFactory} from '../../api/service-factory';


/**
 * SignUpコンポーネント
 */
require('./signup.scss');
@Component({
    template: require('./signup.pug'),
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

    @Action(Actions.signIn)
    signInCommit(user : User) {return; }

    formValidate() : boolean {
        return [
            this.user.validate(),
            this.user.password === this.passwordConfilm
        ].every((x: boolean) => x);
    }

    signUp() : void {
        ServiceFactory.getUserService().signUp({
            ok: (data: any) => {
                this.signInCommit(this.user);
                this.transitionHome();
            },
            failed: (message: string) => {
                this.alertProp.show = true;
                this.alertProp.type = 'danger';
                this.alertProp.message = message;
            }
        }, this.user);
    }

    alert(message: string, type : string) : void {
        this.alertProp.show = true;
        this.alertProp.type = type;
        this.alertProp.message = message;
    }

    transitionHome() : void {
        router.replace('main');
    }
}
