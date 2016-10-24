import Vue from 'vue';
import Vuex from 'vuex';
import soundEngine from '../services/soundengine';
Vue.use(Vuex);

const state = {
    soundEngine: soundEngine,
    masterVolume: 5,
};

const mutations = {
    changeMasterVolume (state, amount) {
        state.soundEngine.changeMasterVolume(amount);
    }
};


const store = new Vuex.Store({
    state,
    mutations
});

export default store;
