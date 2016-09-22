import Vue = require('vue');
import VueRouter = require('vue-router');
import {App} from './app';
import {configureRouter} from './route-config';
import {UserService} from './service/userservice';
/**
 * Application Main Entry Point here!!
 *
 * vue init, router init and config
 * routing start!!
 */
Vue.use(VueRouter);
const router = new VueRouter<App>();
configureRouter(router);

router.start(App, '#app');
export default router;

