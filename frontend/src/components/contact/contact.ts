import {Component} from '../../vue-typed/vue-typed';
/**
 * ContactPage Component
 */
require('./contact.scss');
require('./layout.scss');

@Component({
    template: require('./contact.html'),
    components: {
        navbar : require('vue-strap').navbar
    }
})
export class Contact {

}
