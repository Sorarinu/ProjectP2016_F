import {Component} from '../../vue-typed/vue-typed';
import router from '../../main';

/**
 * IndexPage Component
 */
require('./css/index.scss');
require('./css/layout_top.scss');
require('./css/rest.css');
@Component({
    template: require('./index.html'),
    components: {
        alert: require('vue-strap').alert
    }
})
export class Index {
    goAbout() {
        router.go('about');
    }

    goSignIn() {

        router.go('signin');

    }

    goSignUp() {
        router.go('signup');
    }

    data() {
        return {
            movie: require('./video/movie_pc.mp4')
        };
    }
}
