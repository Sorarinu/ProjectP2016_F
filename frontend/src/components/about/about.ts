import Component from 'vue-class-component';
import Vue = require('vue');
/**
 * AboutPage Component
 */
require('./css/index.scss');

@Component({
    name: 'about',
    template: require('./about.html'),
})
export class About extends Vue {
    toMain(): void {
        this.$router.push('main');
    }

    goAbout() {
        this.$router.push('main');
    }
}
