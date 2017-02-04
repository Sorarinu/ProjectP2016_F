import Vue = require('vue');
import VueRouter = require('vue-router');
import Vuetify = require('vuetify');
import * as $ from 'jquery';
import {sync} from 'vuex-router-sync';
import {App} from './app';
import router from './router/index';
import store from './vuex/store';

/**
 * Application Main Entry Point here!!
 *
 * vue init, router init and config
 * routing start!!
 */

//  jquery
$.ajaxSetup({xhrFields: {
    withCredentials: true,
}});

declare var process: any;
const debug = process.env.NODE_ENV !== 'production';
// Vue.config.silent = debug;
// Vue.config.devtools = debug;

sync(store, router);
Vue.use(Vuetify);

const app = new Vue({
    components: {
        App,
    },
    router,
    store,
    template: `<app></app>`,
});
app.$mount('#app');

export {app, router, store}

