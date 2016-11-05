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


    // bookmarkのディレクトリ開く.
    @Action(Actions.openBookmarkDir)
    openDir(id: number) { return ; }

}
