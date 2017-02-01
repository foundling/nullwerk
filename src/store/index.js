import Vue from 'vue';
import Vuex from 'vuex';
import { state, mutations } from './mutations';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({

    state,
    getters,
    mutations

});

export default store;
