import Component from 'vue-class-component';
import Vue = require('vue');
/**
 * Footer Component
 */
require('./footbar.scss');
@Component({
    name: 'footbar',
    template: require('./footbar.pug'),
})
export class Footbar extends Vue {

}
