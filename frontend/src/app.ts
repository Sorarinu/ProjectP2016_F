import Component from 'vue-class-component';
import {Footbar} from './components/footer/footbar';
import {Navbar} from './components/navbar/navbar';
import Vue = require('vue');

/*
* アプリケーションのトップレベルコンポーネントです
 */
require('./app.scss');
@Component({
    template: require('./app.pug'),
    components: { Navbar, Footbar },
})
export class App extends Vue {

    beforeMount() {
        this.$store.dispatch('init');
    }

    get showFooter() {
        // routerのパスを見て産出する
        return this.$store.state.route.fullPath !== '/main';
    }

    get showNav() {
        // routerのパスを見て産出する
        return this.$store.state.route.fullPath !== '/main';
    }
}
