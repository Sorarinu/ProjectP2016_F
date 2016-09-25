import {Navbar} from './components/navbar/navbar';
import {Footbar} from './components/footer/footbar';
import store from './vuex/store';
import {Component} from 'vue-typed';
/*
* アプリケーションのトップレベルコンポーネントです
 */
require('./app.scss');
@Component({
    template: require('./app.jade'),
    components: { Navbar, Footbar },
    store: store
})
export class App {

}
