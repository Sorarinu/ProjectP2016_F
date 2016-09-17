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
    props: {
        active: {
            type : String,
            default: ''
        }
    }
})
export class Navbar {
    public active: string;

}
