import {Bookmark} from '../../../model/bookmark';
import {Component, Getter} from '../../../vue-typed/vue-typed';
import {getBookmarkRoot} from '../../../vuex/getter';
import {TreeItem} from './tree-item/tree-item';
/**
 * TreeNav フォルダをツリー表示するナビゲーション
 */
require('./treenav.scss');
@Component({
    template: require('./treenav.pug'),
    components: {
        TreeItem,
    },
})
export class TreeNav {
    @Getter(getBookmarkRoot)
    bookmarkRoot: Bookmark;
}
