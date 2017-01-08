import {ServiceFactory} from '../../api/service-factory';
import {Action, Component, Getter} from '../../vue-typed/vue-typed';
import {Actions} from '../../vuex/actions';
import {getSignInNow} from '../../vuex/getter';


/**
 * NavigationBar Component
 */
require('./navbar.scss');

@Component({
    template: require('./navbar.html'),
    components: {
        navbar : require('vue-strap').navbar,
    },
})
export class Navbar {

    @Getter(getSignInNow)
    signInNow: boolean;

    @Action(Actions.signOut)
    signOutCommit() { return; }

    signOut() : void {
        //TODO: エラー処理実装.
        ServiceFactory.getUserService().signOut({
            ok: () => {
                this.signOutCommit();
                return;
            },
            failed: () => {return; },
        });

        this.signOutCommit();
    }

}
