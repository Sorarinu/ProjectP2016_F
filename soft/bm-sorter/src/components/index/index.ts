import Component from 'vue-class-component';


export interface Index extends vuejs.Vue{}

require('./index.scss');

@Component({
    template: require('./index.jade'),
    components: {
        alert : require('vue-strap').alert
    }
})
export class Index{
    data(){
        return{
            showTop: false
        }
    }
}