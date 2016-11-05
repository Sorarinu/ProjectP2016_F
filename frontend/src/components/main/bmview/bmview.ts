import {Component, Action, Getter} from '../../../vue-typed/vue-typed';
import {BmIcon} from './bmicon/bmicon';
import {bookmarkIsEmpty, getShowBookmarks} from '../../../vuex/getter';
import {Actions} from '../../../vuex/actions';
import {Bookmark} from '../../../model/bookmark';
/**
 * BmView Component
 * ブックマーク表示コンポーネント.
 */
require('./bmview.scss');
@Component({
    template: require('./bmview.pug'),
    components: {
        BmIcon
    }
})
export class BmView {

    @Getter(bookmarkIsEmpty)
    bookmarkEmpty : boolean;

    @Getter(getShowBookmarks)
    bookmarks : Bookmark[];

    // アップロードボタンが押されたらフォルダ選択のモーダル=> uploadアクション.の流れだけど
    // とりあえず簡単のために押されたらbookmarkをフェッチしちゃう.
    // fetchでモックのBM読まれてストアに追加される.
    @Action(Actions.fetchBookmark)
    uploadBookmark() {return ; }


    private dragNow : Bookmark;
    /**
     * DragStartでコールされるイベントハンドラ
     * @param e
     * @param bm
     */
    onDragStart(e: DragEvent, bm: Bookmark) {
        console.log(`dragStart : ${bm.id}`);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('id', `${bm.id}`);

        this.dragNow = bm;
    }

    /**
     * DragOverイベントハンドラ
     * Dropを受け付けるためにフォルダの場合はイベントを止める!
     * @param e
     * @param bm
     */
    onDragOver(e: DragEvent, bm: Bookmark) {
        // 条件満たさないやつは全部returnする
        if (!bm.folder) {
            return;
        }

        const from = this.dragNow.id;
        const to = bm.id;
        if (from === to) {
            return;
        }

        e.preventDefault();
    }

    /**
     * Dropでコールされるイベントハンドラ.
     * @param e
     * @param bm
     */
    onDrop(e: DragEvent, bm: Bookmark) {

        if (!bm.folder) {
            return;
        }

        const from = Number(e.dataTransfer.getData('id'));
        const to = bm.id;
        console.log(`dragged id=${from} -> ${to}`);

        if (from === to) {
            throw Error('おいなんで同じところにDnDしようとしてるんだよ・・・');
        }

        // Bookmarkを移動する.
        this.moveBookmark(from, to);
    }

    @Action(Actions.moveBookmark)
    moveBookmark(from: number, to: number) {
        return;
    }
}
