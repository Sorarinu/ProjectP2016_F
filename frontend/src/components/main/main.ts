import {User} from '../../model/user';
import {Component, Getter} from '../../vue-typed/vue-typed';
import {getCurrentUser} from '../../vuex/getter';
import {BmDetail} from './bmdetail/bmdetail';
import {BmView} from './bmview/bmview';
import {Breadcrumbs} from './breadcrumbs/breadcrumbs';
import {Ribbon} from './ribbon/ribbon';
import {Toolbar} from './toolbar/toolbar';
import {TreeNav} from './treenav/treenav';

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
    },
})
export class Main {

    ribbonVisible: boolean;

    data() {

        this.ribbonVisible = false;

        return {
            ribbonVisible: this.ribbonVisible,
        };
    }

    @Getter(getCurrentUser)
    use: User;

    openRibbon() {
        this.ribbonVisible = true;
    }

    closeRibbon() {
        this.ribbonVisible = false;
    }
}
