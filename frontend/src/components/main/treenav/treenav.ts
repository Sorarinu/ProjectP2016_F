import Component from 'vue-class-component';
import {TreeItem} from './tree-item/tree-item';
import Vue = require('vue');

/**
 * TreeNav フォルダをツリー表示するナビゲーション
 */
require('./treenav.scss');
@Component({
    name: 'treenav',
    template: require('./treenav.pug'),
    components: {
        TreeItem,
    },
})
export class TreeNav extends Vue {
    get bookmarkRoot() {
        return this.$store.state.bookmarkRoot;
    };
}
