import Component from 'vue-class-component';

/**
 * IndexPage Component
 */
require('./index.scss');
@Component({
    template: require('./index.jade'),
    components: {
        alert : require('vue-strap').alert
    }
})
export class Index {
	goSignIn() {
		console.log('called');
	}
}
