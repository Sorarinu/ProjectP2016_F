import {App} from '../../../src/app';
import Vue = require('vue');

describe('AppComponent-Test', () => {

    const vm = new Vue({
        template: '<div><app></app></div>',
        components: {App},
    }).$mount();


    it('AppComponentがレンダリングされる', () => {

        expect(vm.$el.querySelector('#navbar')).toBeDefined();
        expect(vm.$el.querySelector('.container')).toBeDefined();
        expect(vm.$el.querySelector('footer')).toBeDefined();
    });
});
