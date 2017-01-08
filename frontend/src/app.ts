import {Footbar} from './components/footer/footbar';
import {Navbar} from './components/navbar/navbar';
import {Action, Component} from './vue-typed/vue-typed';
import {Actions} from './vuex/actions';
import store from './vuex/store';
/*
* アプリケーションのトップレベルコンポーネントです
 */
require('./app.scss');
@Component({
    template: require('./app.pug'),
    components: { Navbar, Footbar },
    store: store,
})
export class App {

    showFooter : boolean;
    showNav : boolean;

    data() {
        this.showFooter = false;
        this.showNav = false;
        return {
            showFooter: this.showFooter,
            showNav: this.showNav,
        };
    }

    @Action(Actions.init)
    init() {
        return;
    }

    created() {
        this.init();
    }
}
