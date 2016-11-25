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
        progressbar: require('vue-strap').progressbar
    },
})
export class SearchDialog {

    @Getter(getSearchDialogShow)
    show : boolean;

    showRes : boolean;

    searchWord : string;

    checkState : number[];

    data() {

        this.searchWord = '';
        this.showRes = false;

        this.checkState = [];

        return {
            checkState : this.checkState,
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
        // IDとかはActionで外部問い合わせ後にわかるから本当はこうならないけど...
        // TODO: クソ方式です　重大なパフォーマンス悪化とかバグが懸念されます...
        const parent = this.hierarchy[this.hierarchy.length - 1];

        const newId = new Date().getMilliseconds();
        const newFolder = new Bookmark(true, newId, parent);
        newFolder.title = this.searchWord;

        this.addBookmarkAct(parent, newFolder);

        this.bookmarkSearchRes.forEach((v: Bookmark) => {
                this.moveBookmarkAct(v.id, newId);
            });

        this.closeSearchDialogAct();

        return;
    }

    @Action(Actions.addBookmark)
    addBookmarkAct(parent: Bookmark, child: Bookmark) {
        return;
    }

    @Action(Actions.moveBookmark)
    moveBookmarkAct(from: number, to: number) {
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
