import {Component} from '../../vue-typed/vue-typed';
import router from '../../main';


/**
 * IndexPage Component
 */
require('./index.scss');
@Component({
    template: require('./index.pug'),
    components: {
        alert : require('vue-strap').alert
    }
})
export class Index {
    goAbout(){
        router.go('about');
    }
	goSignIn() {

        router.go('signin');

	}
    goSignUp(){
        router.go('signup');
    }
}
