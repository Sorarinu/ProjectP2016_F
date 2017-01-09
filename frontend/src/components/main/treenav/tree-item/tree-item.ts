import Component from 'vue-class-component';
import {Bookmark} from '../../../../model/bookmark';
import Vue = require('vue');
/**
 * TreeNav フォルダをツリー表示するナビゲーション
 */
@Component({
    name: 'tree-item',
    template: require('./tree-item.pug'),
    components: {
        TreeItem,
    },
    props: ['bookmark'],
})
export class TreeItem extends Vue {
    expandNow: boolean;
    bookmark: Bookmark;

    data() {
        this.expandNow = false;

        return {
            expandNow : this.expandNow,
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
    openDir(id: number) {
        this.$store.dispatch('openBookmarkDir', id);
    }

}
