import Vue from 'vue';
import Vuex from 'vuex';
import soundEngine from '../services/soundengine';
Vue.use(Vuex);

const state = {
    soundEngine: soundEngine,
    masterVolume: 5,
    octave: 0
};

const mutations = {

    changeMasterVolume (state, amount) {
        state.soundEngine.changeMasterVolume(amount);
    },

    setOctave(state, direction) {
        state.soundEngine.setOctave(direction);
    }

};


const store = new Vuex.Store({

    state,
    mutations

});

export default store;
