import {Navbar} from "./components/navbar/navbar";
import Component from 'vue-class-component';
/*
* アプリケーションのトップレベルコンポーネントです
 */
require('./app.scss');
@Component({
    template: require('./app.html'),
    components: { Navbar }
})
export class App {

}
