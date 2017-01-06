import {Component} from '../../vue-typed/vue-typed';
import router from '../../main';
/**
 * AboutPage Component
 */
require('./css/index.scss');

@Component({
    template: require('./about.html'),
})
export class About {
    toMain() : void {
        router.go('main');
    }

    goAbout() {
        router.go('main');
    }
}
