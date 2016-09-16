import Component from 'vue-class-component';


export interface Contact extends vuejs.Vue{}

@Component({
    template: require('./contact.jade'),
})
export class Contact{

}