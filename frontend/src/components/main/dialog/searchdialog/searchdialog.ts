import Component from 'vue-class-component';
import Vue = require('vue');
import {Bookmark} from '../../../../model/bookmark';

/**
 * SearchDialog
 * ブックマーク検索ダイアログ
 */
require('./searchdialog.scss');
@Component({
    template: require('./searchdialog.pug'),
})
export class SearchDialog extends Vue {

    get show () {
        return this.$store.state.showSearchDialog;
    }

    showRes: boolean;

    searchWord: string;

    checkState: number[];

    data() {
        this.searchWord = '';
        this.showRes = false;

        this.checkState = [];

        return {
            checkState : true,
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

    searchBookmarkAct(bmf: Bookmark, searchWord: string) {
        this.$store.dispatch('searchBookmark', {bmf, searchWord});
    }

    get bookmarkSearchRes () {
        return this.$store.getters.getBookmarkSearchRes;
    }

    getBookmark(id: number) {
        return this.$store.getters.getBookmark(id);
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
        this.$vuetify.bus.pub('modal:toggle:search_modal');
        return;
    }

    addBookmarkAct(parent: Bookmark, bookmark: Bookmark) {
        this.$store.dispatch('addBookmark', {parent, bookmark});
    }

    moveBookmarkAct(from: number, to: number) {
        this.$store.dispatch('moveBookmark', {from, to});
    }

    closeSearchDialogAct() {
        this.$store.dispatch('closeSearchDialog');
    }

    get hierarchy() {
        return this.$store.getters.getBookmarkHierarchy;
    }

    getFromPath(): string {
        const ret = this.hierarchy.map((v: Bookmark) => {
            return v.title;
        }).join('/');

        return ret;
    }
}
