import Component from 'vue-class-component';

/**
 * SignIn Component
 */
@Component({
    template: require('./signin.jade'),
    components: {
        bsInput : require('vue-strap').bsInput
    }
})
export class SignIn {
    data() {
        return {
            userId: '',
            password: ''
        };
    }
}
