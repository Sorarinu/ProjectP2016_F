import {Component, Action, Getter} from 'src/vue-typed/vue-typed';
import {Actions} from 'src/vuex/actions';
import {getBookmarkHierarchy, getOpenDirId} from 'src/vuex/getter';
import {Bookmark} from 'src/model/bookmark';
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

    @Getter(getOpenDirId)
    openDirId : number;

    @Action(Actions.openBookmarkDir)
    openDir(id: number) {
        return ;
    }
}
