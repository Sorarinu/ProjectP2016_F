import Component from 'vue-class-component';
import {SearchDialog} from '../dialog/searchdialog/searchdialog';
import Vue = require('vue');
/**
 * Toolbar Component
 * BMの操作用Actionを呼び出せるアイコンとかを配置するツールバー
 */
require('./toolbar.scss');
@Component({
    template: require('./toolbar.pug'),
    components: {
        SearchDialog,
    },
})
export class Toolbar extends Vue {
    get bookmarkEmpty () {
        return this.$store.getters.bookmarkIsEmpty;
    };

    openSearchDialogAct() {
        this.$store.dispatch('openSearchDialog');
    }

}
