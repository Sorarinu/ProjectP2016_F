import {Component} from '../../vue-typed/vue-typed';
import {BmDetail} from './bmdetail/bmdetail';
import {Breadcrumbs} from './breadcrumbs/breadcrumbs';
import {Toolbar} from './toolbar/toolbar';
import {BmView} from './bmview/bmview';
import {TreeNav} from './treenav/treenav';
import {Ribbon} from './ribbon/ribbon';

/**
 * Main Component
 */
require('./main.scss');
@Component({
    template: require('./main.pug'),
    components: {
        Ribbon,
        TreeNav,
        BmDetail,
        Breadcrumbs,
        BmView,
        Toolbar,
    }
})
export class Main {

    ribbonVisible : boolean;

    data() {

        this.ribbonVisible = false;

        return {
            ribbonVisible: this.ribbonVisible
        };
    }

    openRibbon() {
        this.ribbonVisible = true;
    }

    closeRibbon() {
        this.ribbonVisible = false;
    }
}
