import Component from 'vue-class-component';
import {BmDetail} from './bmdetail/bmdetail';
import {BmView} from './bmview/bmview';
import {Breadcrumbs} from './breadcrumbs/breadcrumbs';
import {Ribbon} from './ribbon/ribbon';
import {Toolbar} from './toolbar/toolbar';
import {TreeNav} from './treenav/treenav';
import Vue = require('vue');

/**
 * Main Component
 */
require('./main.scss');
@Component({
    name: 'main',
    template: require('./main.pug'),
    components: {
        Ribbon,
        TreeNav,
        BmDetail,
        Breadcrumbs,
        BmView,
        Toolbar,
    },
})
export class Main extends Vue {

    ribbonVisible: boolean;

    data() {

        this.ribbonVisible = false;

        return {
            ribbonVisible: this.ribbonVisible,
        };
    }

    get user () {
        return this.$store.state.user;
    }

    openRibbon() {
        this.ribbonVisible = true;
    }

    closeRibbon() {
        this.ribbonVisible = false;
    }
}
