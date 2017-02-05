import Component from 'vue-class-component';
import Vue = require('vue');

/**
 * IndexPage Component
 */
require('./css/index.scss');
require('./css/layout_top.scss');
@Component({
    template: require('./index.html'),
})
export class Index extends Vue {
    goAbout() {
        this.$router.push('main');
    }

    goSignIn() {
        this.$router.push('signin');
    }

    goSignUp() {
        this.$router.push('signup');
    }

    data() {
        return {
            movie: require('./video/movie_pc.mp4'),
        };
    }
}
