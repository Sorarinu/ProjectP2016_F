import {Bookmark} from 'src/model/bookmark';
import Component from 'vue-class-component';
import {BmDeleteDialog} from '../../dialog/bmdeletedialog/bmdeletedialog';
import Vue = require('vue');
/**
 * BmIcon Component
 * ブックマーク表示コンポーネント.
 */
require('./bmicon.scss');
@Component({
    name: 'bmicon',
    template: require('./bmicon.pug'),
    props: ['bookmark'],
    components : {
        BmDeleteDialog,
    },
})
export class BmIcon extends Vue {
    bookmark: Bookmark;

    showContextMenu: boolean;
    posStyle: PosStyle;

    imgSrc: string;

    showDeleteDialog: boolean;

    data() {
        this.showContextMenu = false;

        this.posStyle = {
            position: 'absolute',
            top: '0px',
            left: '0px',
        };

        this.imageLoad();

        this.showDeleteDialog = false;

        return {
            showContextMenu: this.showContextMenu,
            posStyle : this.posStyle,
            imgSrc : this.imgSrc,
            showDeleteDialog : this.showDeleteDialog,
        };
    }

    created() {
        this.imgSrc = require('src/assets/img/ajax-loader.gif');
        this.imageLoad();
    }

    get getSelectBMIds () {
        return this.$store.state.selectBMIds;
    }

    get isActive () {
        if (!this.getSelectBMIds) {
            return false;
        }
        return this.getSelectBMIds.indexOf(this.bookmark.id) >= 0;
    }

    /**
     * サイトのプレビューイメージを取得.
     */
    imageLoad() {
        if (this.bookmark.folder === true) {
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET',
            `https://nxtg-t.net/api/v1/snap?url=${this.bookmark.url}`,
            true);
        xhr.addEventListener('load', () => {
            const oURL = URL.createObjectURL(xhr.response);
            this.imgSrc = oURL;
        });
        xhr.send(null);
    }

    // bookmarkのディレクトリ開く.
    openDir(id: number) {
        this.$store.dispatch('openBookmarkDir', id);
    }

    open() {
        this.contextMenuClose();
        window.open(this.bookmark.url);
    }

    /**
     * タイトル取得.
     * 最大文字長 = 6
     * 長い場合は末尾を...にする
     */
    getTitle(): string {
        let ret = this.bookmark.title;
        if (ret.length >= 6) {
            ret = ret.substr(0, 6);
            ret += '...';
        }

        return ret;
    }

    // bookmark削除ダイアログ表示
    openDeleteDialog(e: MouseEvent) {
        this.contextMenuClose();
        this.openDeleteDialogAct();

        e.stopPropagation();
    }

    openDeleteDialogAct() {
        this.$store.dispatch('openBMDeleteDialog');
    }

    /**
     * コンテキストメニューの展開、折りたたみを行う.
     * 右クリックにバンドル.
     */
    toggleContextMenu(e: MouseEvent) {
        this.posStyle.left = e.clientX + 'px';
        this.posStyle.top = e.clientY + 'px';

        // 次にどこかのcontextmenu開くときにこれを閉じるための関数をセットし
        // 今開いている物を閉じる
        this.contextMenuOpenAct(this.contextMenuClose);

        if (this.getSelectBMIds.length <= 1) {
            this.selectBookmarkAct(this.bookmark.id);
        }

        // 開く
        this.showContextMenu = true;

        // DOM上位にcontextmenuのハンドラがある. そこが引っかかると困る
        e.preventDefault();
        e.stopPropagation();
    }

    contextMenuOpenAct(closer: () => void) {
        this.$store.dispatch('toggleContextMenu', closer);
        return;
    }

    selectBookmark(e: MouseEvent) {
        // コントロールキー押されていれば複数選択
        // 押されていなければ単体選択
        if (e.ctrlKey) {
            this.addSelectBookmarkAct(this.bookmark.id);
        } else {
            this.selectBookmarkAct(this.bookmark.id);
        }
    }

    addSelectBookmarkAct(id: number) {
        this.$store.dispatch('addSelectBookmark', id);
    }

    selectBookmarkAct(id: number) {
        this.$store.dispatch('selectBookmark', id);
    }

    /**
     * コンテキストメニュー閉じる.
     */
    contextMenuClose() {
        this.showContextMenu = false;
    }

}

interface PosStyle {
    position: string;
    left: string;
    top: string;
}
