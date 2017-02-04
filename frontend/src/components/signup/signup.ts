import Component from 'vue-class-component';
import {ServiceFactory} from '../../api/service-factory';
import {User} from '../../model/user';
import Vue = require('vue');

/**
 * SignUpコンポーネント
 */
require('./signup.scss');
@Component({
    name: 'signup',
    template: require('./signup.pug'),
})
export class SignUp extends Vue {
    private user: User;
    private passwordConfilm: string;

    private alertProp: {show: boolean, type: string, message: string};

    data() {
        this.alertProp = {
            show: false,
            type: 'info',
            message: 'sign-in-alert-message',
        };

        this.user = new User('', '');

        return {
            user: this.user,
            passwordConfilm: this.passwordConfilm,
            alertProp: this.alertProp,
        };
    }

    signInCommit(user: User) {
        this.$store.dispatch('signIn', user);
    }

    formValidate(): boolean {
        return [
            this.user.validate(),
            this.user.password === this.passwordConfilm,
        ].every((x: boolean) => x);
    }

    signUp(): void {
        ServiceFactory.getUserService().signUp({
            ok: (data: any) => {
                this.signInCommit(this.user);
                this.transitionHome();
            },
            failed: (message: string) => {
                this.alertProp.show = true;
                this.alertProp.type = 'danger';
                this.alertProp.message = message;
            },
        }, this.user);
    }

    alert(message: string, type: string): void {
        this.alertProp.show = true;
        this.alertProp.type = type;
        this.alertProp.message = message;
    }

    transitionHome(): void {
        this.$router.push('main');
    }
}
