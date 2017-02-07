import SoundEngine from '../services/SoundEngine';

const state = {
    // not reactive
    soundEngine: new SoundEngine({ initialVolume: 0.0, initialOctave: 0 }),

};

const mutations = {

    SET_MASTER_VOLUME (state, { amount }) {
        state.soundEngine.setMasterVolume(amount);
    },

    TOGGLE_MASTER_VOLUME (state) {

        if (state.soundEngine.active) {
            state.soundEngine.enable();
        } else {
            state.soundEngine.disable();
        }
    },

    SET_OCTAVE (state, { direction }) {
        state.soundEngine.setOctave(direction);
    }

};


export { state, mutations };


