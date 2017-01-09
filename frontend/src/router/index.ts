
import Vue = require('vue');
import Router = require('vue-router');
import {About} from '../components/about/about';
import {Contact} from '../components/contact/contact';
import {Help} from '../components/help/help';
import {Index} from '../components/index/index';
import {Main} from '../components/main/main';
import {SignIn} from '../components/signin/signin';
import {SignUp} from '../components/signup/signup';
/**
 * Vue-routerのルーケティング設定.
 */

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        { // ルートパスはIndexへとばす
            name: 'root',
            path: '/',
            redirect: 'index',
        },
        {　// indexでもindexへ飛ばす
            component: Index,
            name: 'index',
            path: '/index',
        },
        {　// aboutページ
            component: About,
            name: 'about',
            path: '/about',
        },
        { // contactページ
            component: Contact,
            name: 'contact',
            path: '/contact',
        },
        {　// helpページ
            component: Help,
            name: 'help',
            path: '/contact',
        },
        { // SingInフォーム
            component: SignIn,
            name: 'signin',
            path: '/signin',
        },
        { // SingUpフォーム
            component: SignUp,
            name: 'signup',
            path:  '/signup',
        },
        {
            component: Main,
            name: 'main',
            path: '/main',
        },
    ],
});

export default router;
