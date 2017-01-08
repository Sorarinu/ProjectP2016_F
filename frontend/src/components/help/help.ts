import {Component} from '../../vue-typed/vue-typed';
/**
 * HelpPage Component
 */
require('./help.scss');
@Component({
    template: require('./help.pug'),
    components: {
        alert : require('vue-strap').alert ,
        bsInput : require('vue-strap').input,
    },
})
export class Help {
    data() {
        return {
            showTop: false,
        };
    }
}
