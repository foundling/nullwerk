import { state } from './mutations';

export default {
    currentOctave(state) {
        return state.soundEngine.octave;
    },
    currentVolume (state) {
        return state.soundEngine.volume;
    }
};