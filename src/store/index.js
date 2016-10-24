import Vue from 'vue';
import Vuex from 'vuex';
import SoundEngine from '../services/soundengine';
Vue.use(Vuex);

const soundEngine = new SoundEngine();

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
