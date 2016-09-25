/**
 * ナビゲーションバー
 */
import Component from 'vue-class-component';
import {UserService} from '../../service/userservice';


/**
 * NavigationBar Component
 */
require('./navbar.scss');
@Component({
    template: require('./navbar.jade'),
    components: {
        navbar : require('vue-strap').navbar
    }
})
export class Navbar {

    private userService: UserService;

    data() {

        this.userService = UserService.getInstance();

        return {
            loginNow : this.userService.loginNow,
            user : this.userService.user
        };
    }

    signOut() : void {
        //TODO: エラー処理実装.
        this.userService.signOut({
            ok: () => {return; },
            ng: () => {return; },
            failed: () => {return; }
        });
    }
}
