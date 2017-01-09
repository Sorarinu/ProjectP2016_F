
import * as Vue from 'vue';
import Component from 'vue-class-component';
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
export class PagePreviewDialog extends Vue {
    show: boolean;

    data() {
        this.show = false;

        return {
            show: this.show,
        };
    }

}
