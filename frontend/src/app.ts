import {Navbar} from './components/navbar/navbar';
import {Footbar} from './components/footer/footbar';
import store from './vuex/store';
import {Component, Action} from './vue-typed/vue-typed';
import {Actions} from './vuex/actions';
/*
* アプリケーションのトップレベルコンポーネントです
 */
require('./app.scss');
@Component({
    template: require('./app.pug'),
    components: { Navbar, Footbar },
    store: store
})
export class App {

    showFooter : boolean;
    showNav : boolean;

    data() {
        this.showFooter = false;
        this.showNav = false;
        return {
            showFooter: this.showFooter,
            showNav: this.showNav
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
