import {Component} from '../../../../vue-typed/vue-typed';

/**
 * SearchDialog
 * ブックマーク検索ダイアログ
 */
require('./searchdialog.scss');
@Component({
    template: require('./searchdialog.pug'),
    components: {
        modal: require('vue-strap').modal
    }
})
export class SearchDialog {

    show : boolean;

    data() {
        this.show = false;

        return {
            show: this.show
        };
    }

}
