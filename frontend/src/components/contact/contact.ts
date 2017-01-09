import Component from 'vue-class-component';
import Vue = require('vue');
/**
 * ContactPage Component
 */
require('./contact.scss');
require('./layout.scss');

@Component({
    name: 'contact',
    template: require('./contact.html'),
    components: {
        navbar: require('vue-strap').navbar,
    },
})
export class Contact extends Vue {

}
