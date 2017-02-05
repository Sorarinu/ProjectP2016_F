import Component from 'vue-class-component';
import Vue = require('vue');
/**
 * HelpPage Component
 */
require('./help.scss');
@Component({
    name: 'help',
    template: require('./help.pug'),
})
export class Help extends Vue {
    data() {
        return {
            showTop: false,
        };
    }
}
