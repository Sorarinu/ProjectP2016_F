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
})
export class Contact extends Vue {

}
