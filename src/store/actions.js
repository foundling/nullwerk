export const actions = {
    changeFrequency(context){ 
        context.commit('CHANGE_FREQUENCY', newFrequency);
    },
    changeMasterVolume(context) {
        context.commit('CHANGE_MASTER_VOLUME', amount);
    },
    changeMasterVolume(context) {
        context.commit('CHANGE_OSCILLATOR_VOLUME', oscillatorName,  amount);
    },
};

