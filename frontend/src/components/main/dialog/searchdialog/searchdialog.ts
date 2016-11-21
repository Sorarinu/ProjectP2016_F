import {Component, Getter, Action} from 'src/vue-typed/vue-typed';
import {Bookmark} from 'src/model/bookmark';
import {getBookmarkHierarchy, getSearchDialogShow, getBookmarkSearchRes, getBookmark} from 'src/vuex/getter';
import {Actions} from '../../../../vuex/actions';

/**
 * SearchDialog
 * ブックマーク検索ダイアログ
 */
require('./searchdialog.scss');
@Component({
    template: require('./searchdialog.pug'),
    components: {
        modal: require('vue-strap').modal,
        checkbox: require('vue-strap').checkbox
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
        const bmf = this.hierarchy[this.hierarchy.length - 1];
        this.searchBookmarkAct(bmf, this.searchWord);
        this.showRes = true;
        return;
    }

    @Action(Actions.searchBookmark)
    searchBookmarkAct(bmf: Bookmark, searchWord: string) {
        return;
    }

    @Getter(getBookmarkSearchRes)
    bookmarkSearchRes : Bookmark[];

    @Getter(getBookmark)
    getBookmark(id: number): Bookmark {
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
