import Vue from 'vue'; 
import Vuex from 'vuex';
import actions from './actions';
import SoundEngine from '../services/SoundEngine';

Vue.use(Vuex);

const state = {
    soundEngine: new SoundEngine()
};

const mutations = {

    CHANGE_FREQUENCY (state, newFrequency) {
        state.soundEngine.changefrequency(newFrequency);
    },

    CHANGE_MASTER_VOLUME (state, amount) {
        state.soundEngine.changeVolume(amount);
    },

    CHANGE_OSCILLATOR_VOLUME (state, oscillatorName, amount) {
        state.soundEngine.changeOscillatorVolume(oscillatorName, amount);
    },

}

export default new Vuex.Store({ 
    state, 
    mutations 
});
