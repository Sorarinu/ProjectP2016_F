import {Component, Getter} from '../../../vue-typed/vue-typed';
import {getSelectedBMIds, getSelectBMs} from '../../../vuex/getter';
import {Bookmark} from '../../../model/bookmark';
/**
 * BmDetail Component
 * 今アクティブなBMの詳細を出したりする
 */
require('./bmdetail.scss');
@Component({
    template: require('./bmdetail.pug')
})
export class BmDetail {
    @Getter(getSelectedBMIds)
    selectBMIds : number[];

    @Getter(getSelectBMs)
    selectBMs : Bookmark[];

    getBM() : Bookmark {
        return this.selectBMs[0];
    }


}
