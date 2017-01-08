import {Action, Component, Getter} from '../../../vue-typed/vue-typed';
import {Actions} from '../../../vuex/actions';
import {bookmarkIsEmpty} from '../../../vuex/getter';
import {SearchDialog} from '../dialog/searchdialog/searchdialog';
/**
 * Toolbar Component
 * BMの操作用Actionを呼び出せるアイコンとかを配置するツールバー
 */
require('./toolbar.scss');
@Component({
    template: require('./toolbar.pug'),
    components: [SearchDialog],
})
export class Toolbar {
    @Getter(bookmarkIsEmpty)
    bookmarkEmpty: boolean;

    @Action(Actions.openSearchDialog)
    openSearchDialogAct() {
        return;
    }

}
