import {Component} from '../../vue-typed/vue-typed';
import {BmDetail} from './bmdetail/bmdetail';
import {Breadcrumbs} from './breadcrumbs/breadcrumbs';
import {Toolbar} from './toolbar/toolbar';
import {BmView} from './bmview/bmview';
import {TreeNav} from './treenav/treenav';
/**
 * Main Component
 */
require('./main.scss');
@Component({
    template: require('./main.pug'),
    components: {
        TreeNav,
        BmDetail,
        Breadcrumbs,
        BmView,
        Toolbar,
    }
})
export class Main {

}
