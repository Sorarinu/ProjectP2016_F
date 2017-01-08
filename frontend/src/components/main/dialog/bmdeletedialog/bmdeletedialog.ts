import {Action, Component, Getter} from 'src/vue-typed/vue-typed';
import {Actions} from 'src/vuex/actions';
import {getDeleteDialogShow} from '../../../../vuex/getter';

/**
 * ブックマーク本当に削除していいの？　ダイアログ
 */
@Component({
    template: require('./bmdeletedialog.pug'),
    components: {
        modal: require('vue-strap').modal,
    },
})
export class BmDeleteDialog {
    @Getter(getDeleteDialogShow)
    show: boolean;

    deleteBookmark() {
        this.closeDialogAct();
        this.deleteBookmarkAct();
    }

    @Action(Actions.deleteSelectBookmark)
    deleteBookmarkAct() {
        return;
    }

    @Action(Actions.closeBMDeleteDialog)
    closeDialogAct() {
        return;
    }

}
