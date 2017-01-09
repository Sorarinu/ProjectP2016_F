require('es6-promise').polyfill();

import {sync} from 'vuex-router-sync';
import {App} from '../../../src/app';
import store from '../../../src/vuex/store';
import router from '../../../src/router/index';
import Vue = require('vue');
import Vuex = require('vuex');

describe('AppComponent-Test', () => {

    sync(store, router);
    const vm = new Vue({
        template: '<div><app></app></div>',
        components: {App},
        store,
        router,
    }).$mount();

    it('AppComponentがレンダリングされる', () => {
        expect(vm.$el.querySelector('#navbar')).toBeDefined();
        expect(vm.$el.querySelector('.container')).toBeDefined();
        expect(vm.$el.querySelector('footer')).toBeDefined();
    });
});
