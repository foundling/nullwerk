import { state } from './mutations';

export default {
    currentOctave(state) {
        return state.soundEngine._octave;
    },
    currentVolume (state) {
        return state.soundEngine.volume;
    },
    soundActive (state) {
        return state.soundEngine.active;
    },
    oscillatorSettings (state) {
        return state.soundEngine.oscillatorSettings;
    },
    envelopeSettings (state) {
        return state.soundEngine.envelopeSettings;
    }

};
