import Vue = require('vue');
import Vuex = require('vuex');
import actions from './actions';
import getters from './getter';
import mutations from './mutations';
import state from './state';


Vue.use(Vuex);

// debug setting.
declare var process: any;
const debug = (process.env.NODE_ENV !== 'production');

// A Vuex instance is created by combining the state, the actions,
// and the mutations. Because the actions and mutations are just
// functions that do not depend on the instance itself, they can
// be easily tested or even hot-reloaded (see counter-hot example).
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    strict: debug,
});

export default store;
