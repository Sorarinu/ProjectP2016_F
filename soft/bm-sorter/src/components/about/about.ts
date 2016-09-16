import Component from 'vue-class-component';


export interface About extends vuejs.Vue{}

@Component({
    template: require('./about.jade'),
})
export class About{

}