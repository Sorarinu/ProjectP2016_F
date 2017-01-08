import {Bookmark} from '../../../model/bookmark';
import {Component, Getter} from '../../../vue-typed/vue-typed';
import {getSelectBMs, getSelectedBMIds} from '../../../vuex/getter';
/**
 * BmDetail Component
 * 今アクティブなBMの詳細を出したりする
 */
require('./bmdetail.scss');
@Component({
    template: require('./bmdetail.pug'),
})
export class BmDetail {
    @Getter(getSelectedBMIds)
    selectBMIds: number[];

    @Getter(getSelectBMs)
    selectBMs: Bookmark[];

    getBM(): Bookmark {
        return this.selectBMs[0];
    }
}
