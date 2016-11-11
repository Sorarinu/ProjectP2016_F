import {Component, Action} from '../../../../vue-typed/vue-typed';
import {Bookmark} from '../../../../model/bookmark';
import {Actions} from '../../../../vuex/actions';
/**
 * BmView Component
 * ブックマーク表示コンポーネント.
 */
require('./bmicon.scss');
@Component({
    template: require('./bmicon.pug'),
    props: ['bookmark']
})
export class BmIcon {
    bookmark : Bookmark;

    showContextMenu : boolean;

    posStyle : PosStyle;

    data() {
        this.showContextMenu = false;

        this.posStyle = {
            position: 'absolute',
            top: '0px',
            left: '0px'
        };

        return {
            showContextMenu: this.showContextMenu,
            posStyle : this.posStyle,
        };
    }

    // bookmarkのディレクトリ開く.
    @Action(Actions.openBookmarkDir)
    openDir(id: number) { return ; }

    open() {
        window.open(this.bookmark.url);
    }

    // bookmark削除する.
    @Action(Actions.deleteBookmark)
    delete(id: number) { return ; }


    /**
     * コンテキストメニューの展開、折りたたみを行う.
     * 右クリックにバンドル.
     */
    toggleContextMenu(e: MouseEvent) {

        this.posStyle.left = e.clientX + 'px';
        this.posStyle.top = e.clientY + 'px';

        this.showContextMenu = !this.showContextMenu;

        e.preventDefault();
    }

    /**
     * コンテキストメニュー閉じる.
     */
    contextMenuClose() {
        if (this.showContextMenu) {
            this.showContextMenu = false;
        }
    }

}

interface PosStyle {
    position : string;
    left : string;
    top : string;
}
