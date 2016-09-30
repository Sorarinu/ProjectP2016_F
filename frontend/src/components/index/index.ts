import {Component} from 'vue-typed';
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
		console.log('called');
	}
}
