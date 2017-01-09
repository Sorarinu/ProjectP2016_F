import Component from 'vue-class-component';
import {Bookmark} from '../../../model/bookmark';
import Vue = require('vue');
/**
 * BmDetail Component
 * 今アクティブなBMの詳細を出したりする
 */
require('./bmdetail.scss');
@Component({
    name: 'bmdetail',
    template: require('./bmdetail.pug'),
})
export class BmDetail extends Vue {
    get selectBMIds () {
        return this.$store.getters.getSelectBMIds();
    }

    get selectBMs () {
        return this.$store.getters.getSelectBMs();
    }

    getBM(): Bookmark {
        return this.selectBMs[0];
    }
}
