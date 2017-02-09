
import * as Vue from 'vue';
import Component from 'vue-class-component';
/**
 * ブックマーク本当に削除していいの？　ダイアログ
 */
@Component({
    template: require('./bmdeletedialog.pug'),
})
export class BmDeleteDialog extends Vue {
    deleteBookmark() {
        this.$store.dispatch('deleteSelectBookmark');
    }
}
