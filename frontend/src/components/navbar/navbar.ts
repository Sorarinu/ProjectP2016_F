/**
 * ナビゲーションバー
 */
import Component from 'vue-class-component';


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

}
