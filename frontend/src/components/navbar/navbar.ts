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
    data() {
        return {
            loginNow : UserService.getInstance().loginNow
        };
    }

    signOut() : void {
        return;
    }
}
