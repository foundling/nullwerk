import SoundEngine from '../services/SoundEngine';

const state = {
    // not reactive
    soundEngine: new SoundEngine({ initialVolume: 0.0, initialOctave: 0 }),

};

const mutations = {

    SET_MASTER_VOLUME (state, { amount }) {
        state.soundEngine.setMasterVolume(amount);
    },

    SET_OCTAVE (state, { direction }) {
        state.soundEngine.setOctave(direction);
    }

};


export { state, mutations };


