import Component from 'vue-class-component';
import {ServiceFactory} from '../../api/service-factory';
import Vue = require('vue');

/**
 * NavigationBar Component
 */
require('./navbar.scss');

@Component({
    name: 'navbar',
    template: require('./navbar.html'),
})
export class Navbar extends Vue {

    get signInNow (): boolean {
        return this.$store.state.signInNow;
    }

    signOut(): void {
        // TODO: エラー処理実装.
        ServiceFactory.getUserService().signOut({
            ok: () => {return; },
            failed: () => {return; },
        });

        this.$store.dispatch('signOut');
    }
}
