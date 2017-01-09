
import * as Vue from 'vue';
import Component from 'vue-class-component';
/**
 * ブックマーク本当に削除していいの？　ダイアログ
 */
@Component({
    template: require('./bmdeletedialog.pug'),
    components: {
        modal: require('vue-strap').modal,
    },
})
export class BmDeleteDialog extends Vue {
    get show() {
        return this.$store.state.deleteDialogShow;
    };

    deleteBookmark() {
        this.$store.dispatch('deleteSelectBookmark');
        this.$store.dispatch('closeBMDeleteDialog');
    }
}
