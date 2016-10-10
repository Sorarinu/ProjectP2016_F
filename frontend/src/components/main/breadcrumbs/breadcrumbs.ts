import {Component, Action, Getter} from '../../../vue-typed/vue-typed';
import {Actions} from '../../../vuex/actions';
import {getBookmarkHierarchy} from '../../../vuex/getter';
import {Bookmark} from '../../../model/bookmark';
/**
 * Breadcrumbs Component
 * パンくずナビゲーション
 */
require('./breadcrumbs.scss');
@Component({
    template: require('./breadcrumbs.pug')
})
export class Breadcrumbs {

    @Getter(getBookmarkHierarchy)
    bookmarkHierarchy : Bookmark[];

    @Action(Actions.openBookmarkDir)
    openDir(id: number) {
        return ;
    }
}
