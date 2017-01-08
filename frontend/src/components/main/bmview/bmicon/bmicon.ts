import {Bookmark} from 'src/model/bookmark';
import {Action, Component, Getter} from 'src/vue-typed/vue-typed';
import {Actions} from 'src/vuex/actions';
import {getSelectedBMIds} from '../../../../vuex/getter';
import {BmDeleteDialog} from '../../dialog/bmdeletedialog/bmdeletedialog';
/**
 * BmIcon Component
 * ブックマーク表示コンポーネント.
 */
require('./bmicon.scss');
@Component({
    template: require('./bmicon.pug'),
    props: ['bookmark'],
    components : [
        BmDeleteDialog,
    ],
})
export class BmIcon {
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

    @Getter(getSelectedBMIds)
    getSelectBMIds: number[];

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
    @Action(Actions.openBookmarkDir)
    openDir(id: number) { return ; }

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
    @Action(Actions.openBMDeleteDialog)
    openDeleteDialogAct() {
        return ;
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
    @Action(Actions.toggleContextMenu)
    contextMenuOpenAct(closer: () => void) {
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

    @Action(Actions.addSelectBookmark)
    addSelectBookmarkAct(id: number) {
        return;
    }

    @Action(Actions.selectBookmark)
    selectBookmarkAct(id: number) {
        return;
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
