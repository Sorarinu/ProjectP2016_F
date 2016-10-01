import {UserService} from '../../api/userservice';
import {Component, Action , Getter} from '../../vue-typed/vue-typed';
import {Actions} from '../../vuex/actions';
import {getSignInNow} from '../../vuex/getter';


/**
 * NavigationBar Component
 */
require('./navbar.scss');

@Component({
    template: require('./navbar.pug'),
    components: {
        navbar : require('vue-strap').navbar
    }
})
export class Navbar {

    @Getter(getSignInNow)
    signInNow: boolean;

    @Action(Actions.signOut)
    signOutCommit() { return; }

    signOut() : void {
        //TODO: エラー処理実装.
        UserService.signOut({
            ok: () => {
                this.signOutCommit();
                return;
            },
            ng: () => {return; },
            failed: () => {return; }
        });

        this.signOutCommit();
    }

}
