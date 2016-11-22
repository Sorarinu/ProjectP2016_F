import {Component, Action} from '../../../../vue-typed/vue-typed';
import {Actions} from '../../../../vuex/actions';
import {Bookmark} from '../../../../model/bookmark';
/**
 * TreeNav フォルダをツリー表示するナビゲーション
 */
@Component({
    template: require('./tree-item.pug'),
    components: {
        TreeItem
    },
    props: ['bookmark'],
})
export class TreeItem {

    expandNow : boolean;

    bookmark : Bookmark;

    data() {

        this.expandNow = false;

        return {
            expandNow : this.expandNow
        };
    }

    /**
     * ツリーを展開,折りたたみします
     */
    toggle() {
        this.expandNow = !this.expandNow;
    }

    openBm() {
        // クリックしたときフォルダなら展開. ブックマークならウィンドウで開く.
        if (this.bookmark.folder) {
            this.openDir(this.bookmark.id);
        } else {
            window.open(this.bookmark.url);
        }
    }

    /**
     * BookmarkView側でフォルダを展開します.
     * @param id
     */
    @Action(Actions.openBookmarkDir)
    openDir(id : number) {
        return ;
    }

}
