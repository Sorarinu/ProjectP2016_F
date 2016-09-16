import {App} from "./app";
import {Index} from "./components/index/index";
import {About} from "./components/about/about";
import {Contact} from "./components/contact/contact";
import {Help} from "./components/help/help";
/**
 * Vue-routerのルーケティング設定.
 */
export function configureRouter(router: vuejs.Router<App>){
    router.map({
        '/':{ //ルートパスはIndexへとばす
            component: Index,
            name : 'index'
        },
        '/index':{　//indexでもindexへ飛ばす
            component: Index,
            name : 'index'
        },
        '/about':{　//aboutページ
            component: About,
            name : 'about'
        },
        '/contact':{ //contactページ
            component: Contact,
            name : 'contact'
        },
        '/help':{　//helpページ
            component: Help,
            name : 'help'
        }
    });

    router.afterEach((transition)=>{
        //app.active に現在表示中のコンポーネント名を渡します
        //navbar componentで現在表示中のリンクのスタイルを変えたりするのに使っていきます.
        router.app.active = transition.to.path.split("/")[1];
    });
}
