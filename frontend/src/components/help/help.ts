import Component from 'vue-class-component';

/**
 * HelpPage Component
 */
require('./help.scss');
@Component({
    template: require('./help.jade'),
    components: {
        alert : require('vue-strap').alert ,
        bsInput : require('vue-strap').input
    }
})
export class Help {
    data() {
        return {
            showTop: false,
        };
    }
}
