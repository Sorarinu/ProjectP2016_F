import Component from 'vue-class-component';
import Vue = require('vue');
/**
 * Ribbon Component
 * リボンUIをつくるよ.
 */
require('./ribbon.scss');
@Component({
    name: 'ribbon',
    template: require('./ribbon.pug'),
})
export class Ribbon extends Vue {
    openUploadDialogAct() {
        this.$store.dispatch('openUploadDialog');
    }
}
