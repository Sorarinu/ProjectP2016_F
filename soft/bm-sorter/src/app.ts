import {Navbar} from './components/navbar/navbar';
import Component from 'vue-class-component';
import {Footbar} from './components/footer/footbar';
/*
* アプリケーションのトップレベルコンポーネントです
 */
require('./app.scss');
@Component({
    template: require('./app.jade'),
    components: { Navbar, Footbar }
})
export class App {

}
