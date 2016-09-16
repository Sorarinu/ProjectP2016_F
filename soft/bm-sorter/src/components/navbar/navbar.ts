/**
 * ナビゲーションバー
 */
import Component from 'vue-class-component';

export interface Navbar extends vuejs.Vue{ }


require('./navbar.scss');

@Component({
    template: require('./navbar.jade'),
    props:{
        active:{
            type:String,
            default:""
        }
    }
})
export class Navbar {
    public active: string;

}
