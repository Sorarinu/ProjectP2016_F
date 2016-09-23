import Component from 'vue-class-component';
import {User} from '../../model/user';
import {UserService} from '../../service/userservice';

/**
 * SignIn Component
 */
require('./signin.scss');
@Component({
    template: require('./signin.jade'),
    components: {
        bsInput : require('vue-strap').input ,
        alert: require('vue-strap').alert
    }
})
export class SignIn {

    userService : UserService;

    data() {

        this.userService = UserService.getInstance();
        this.userService.user = new User('', '');

        return {
            user : this.userService.user
        };
    }

    signIn() : void {
        this.userService.signIn({
            ok: (data: any) => {
                return;
            },
            ng: (message: string) => {
                return;
            },
            failed: (message: string) => {
                return;
            }
        });
    }

    isValidFormData() : boolean {
        return this.userService.user.validate();
    }
}
