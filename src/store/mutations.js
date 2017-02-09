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
        state.soundEngine.toggleMasterVolume();
    },

    SET_OCTAVE (state, { direction }) {
        state.soundEngine.setOctave(direction);
    },

    SET_OSCILLATOR_LEVEL (state, { name, level }) {
        state.soundEngine.oscillatorSettings[name].level = level;
    },

    SET_ENVELOPE_LEVEL (state, { name, level }) {
        state.soundEngine.envelopeSettings[name].level = level;
    }

};


export { state, mutations };


