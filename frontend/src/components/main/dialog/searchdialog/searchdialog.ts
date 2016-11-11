import {Component, Getter, Action} from 'src/vue-typed/vue-typed';
import {Bookmark} from 'src/model/bookmark';
import {getBookmarkHierarchy, getSearchDialogShow} from 'src/vuex/getter';
import {Actions} from '../../../../vuex/actions';

/**
 * SearchDialog
 * ブックマーク検索ダイアログ
 */
require('./searchdialog.scss');
@Component({
    template: require('./searchdialog.pug'),
    components: {
        modal: require('vue-strap').modal
    },
})
export class SearchDialog {

    @Getter(getSearchDialogShow)
    show : boolean;

    showRes : boolean;

    searchWord : string;


    data() {

        this.searchWord = '';
        this.showRes = false;

        return {
            searchWord : this.searchWord,
            showRes : this.showRes,
        };
    }


    /**
     * APIへの問い合わせを行い結果を表示する.
     */
    search() {
        this.showRes = true;
        return;
    }


    grouping() {
        this.closeSearchDialogAct();
        return;
    }


    @Action(Actions.closeSearchDialog)
    closeSearchDialogAct() {
        return;
    }



    @Getter(getBookmarkHierarchy)
    hierarchy : Bookmark[];

    getFromPath() : string {

        const ret = this.hierarchy.map((v : Bookmark) => {
            return v.title;
        }).join('/');

        return ret;
    }
}
