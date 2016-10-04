import {User} from '../../model/user';
import router from '../../main';
import {Component, Action} from '../../vue-typed/vue-typed';
import {Actions} from '../../vuex/actions';
import {ServiceFactory} from '../../api/service-factory';

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
        ServiceFactory.getUserService().signIn({
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

    isValidFormData() : boolean {
        return this.user.validate();
    }

    transitionHome() : void {
        router.replace('main');
    }
}
