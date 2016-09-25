import {Navbar} from './components/navbar/navbar';
import Component from 'vue-class-component';
import {Footbar} from './components/footer/footbar';
import {UserService} from './service/userservice';
import {User} from './model/user';
import {BookmarkService} from './service/bookmarkservice';
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
