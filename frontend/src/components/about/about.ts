import {Component} from '../../vue-typed/vue-typed';
import router from '../../main';
/**
 * AboutPage Component
 */
@Component({
    template: require('./about.pug'),
})
export class About {
    toMain() : void {
        router.go('main');
    }
}
