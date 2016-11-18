import {Component} from '../../vue-typed/vue-typed';
import router from '../../main';
/**
 * AboutPage Component
 */
@Component({
    template: require('./about.html'),
})
export class About {
    toMain() : void {
        router.go('main');
    }
}
