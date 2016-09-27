import {App} from './app';
import {Index} from './components/index/index';
import {About} from './components/about/about';
import {Contact} from './components/contact/contact';
import {Help} from './components/help/help';
import {SignIn} from './components/signin/signin';
import {SignUp} from './components/signup/signup';
/**
 * Vue-routerのルーケティング設定.
 */
export function configureRouter(router: vuejs.Router<App>) {
    router.map({
        '/': { // ルートパスはIndexへとばす
            component: Index,
            name : 'index'
        },
        '/index': {　// indexでもindexへ飛ばす
            component: Index,
            name : 'index'
        },
        '/about': {　// aboutページ
            component: About,
            name : 'about'
        },
        '/contact': { // contactページ
            component: Contact,
            name : 'contact'
        },
        '/help': {　// helpページ
            component: Help,
            name : 'help'
        },
        '/signin': { // SingInフォーム
            component: SignIn,
            name : 'signin'
        },
        '/signup': { // SingUpフォーム
            component: SignUp,
            name : 'signup'
        }
    });
}
