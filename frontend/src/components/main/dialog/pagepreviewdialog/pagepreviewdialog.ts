import {Component} from 'src/vue-typed/vue-typed';

/**
 * PagePreviewDialog
 * ブックマークのプレビューをオーバーレイ表示するダイアログ
 */
require('./searchdialog.scss');
@Component({
    template: require('./searchdialog.pug'),
    components: {
        modal: require('vue-strap').modal,
    },
})
export class PagePreviewDialog {
    show: boolean;

    data() {
        this.show = false;

        return {
            show: this.show,
        };
    }

}
