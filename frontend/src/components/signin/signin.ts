import Component from 'vue-class-component';
import {ServiceFactory} from '../../api/service-factory';
import {User} from '../../model/user';
import Vue = require('vue');

/**
 * SignIn Component
 */
require('./signin.scss');
@Component({
    name: 'signin',
    template: require('./signin.pug'),
})
export class SignIn extends Vue {
    private user: User;
    private alertProp: {show: boolean, type: string, message: string};

    data() {
        this.user = new User('', '');

        this.alertProp = {
            show: false,
            type: 'info',
            message: 'alert-message',
        };

        return {
            alertProp: this.alertProp,
            user: this.user,
        };
    }

    signInCommit(user: User) {
        this.$store.dispatch('signIn', user);
    }

    signIn(): void {
        if (!this.isValidFormData()) {
            return;
        }
        ServiceFactory.getUserService().signIn({
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

    isValidFormData(): boolean {
        return this.user.validate();
    }

    transitionHome(): void {
        this.$router.push('main');
    }
}
