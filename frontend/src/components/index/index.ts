import {Component} from 'vue-typed';
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

}
