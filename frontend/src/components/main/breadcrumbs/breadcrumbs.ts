import Component from 'vue-class-component';
import Vue = require('vue');

/**
 * Breadcrumbs Component
 * パンくずナビゲーション
 */
require('./breadcrumbs.scss');
@Component({
    template: require('./breadcrumbs.pug'),
})
export class Breadcrumbs extends Vue {

    get bookmarkHierarchy() {
        return this.$store.getters.bookmarkHierarchy();
    }

    get openDirId(): number {
        return this.$store.state.openDir;
    }

    openDir(id: number) {
        this.$store.dispatch('openBookmarkDir', id);
    }
}
