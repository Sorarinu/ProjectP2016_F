import Component from 'vue-class-component';
import {User} from '../../model/user';

/**
 * SignIn Component
 */
require('./signin.scss');
@Component({
    template: require('./signin.jade'),
    components: {
        bsInput : require('vue-strap').input
    }
})
export class SignIn {

    user : User;

    data() {
        return {
            user : new User('', '')
        };
    }

    signIn() : void {
        //TODO: SingIn処理実実装
        //signInする処理　UserServiceのSingIn処理を呼び出し応答を返答.
    }

    isValidFormData() : boolean {
        return this.user.validate();
    }
}
