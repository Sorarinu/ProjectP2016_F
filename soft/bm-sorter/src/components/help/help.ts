import Component from 'vue-class-component';


export interface Help extends vuejs.Vue{}

@Component({
    template: require('./help.jade'),
})
export class Help{

}