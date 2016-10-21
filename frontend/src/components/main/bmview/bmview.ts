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


}
