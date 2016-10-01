import {Component} from '../../vue-typed/vue-typed';

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
	goSignIn() {
			
	}
}
