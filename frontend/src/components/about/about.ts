import router from '../../main';
import {Component} from '../../vue-typed/vue-typed';
/**
 * AboutPage Component
 */
require('./css/index.scss');

@Component({
    template: require('./about.html'),
})
export class About {
    toMain(): void {
        router.go('main');
    }

    goAbout() {
        router.go('main');
    }
}
