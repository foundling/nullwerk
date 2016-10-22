export default class SoundEngine {

    constructor() {
        
        const AudioContext = window.AudioContext || window.webkitAudioContext; 
        const context = new AudioContext();
        const defaultVolume = 0.6;
        const masterGain = context.createGain();
        masterGain.connect(context.destination);
        masterGain.gain.value = 0.0;

        const wfTypeToOscillator = (o, waveformType) => {
            o[waveformType] = context.createOscillator();
            o[waveformType]['type'] = waveformType;
            o[waveformType]['frequency']['value'] = 440;
            return o;
        };

        /*
         * Build a map of oscillator name -> oscillator and gain objects
         */

        this.oscillators = [ 'sawtooth', 'sine', 'square', 'triangle' ]
            .map(function(wfType) {
                // create oscillators from waveform name
                let oscNode = context.createOscillator();
                oscNode.type = wfType;
                oscNode.frequency.value = 440;
                return {
                    oscNode: oscNode
                };
            })
            .map(function(oscNode) {
                // create gain nodes
                oscNode.gainNode = context.createGain();
                oscNode.gainNode.gain.level = defaultVolume;
                return oscNode;
            })
            .reduce(function(o, oscNode) {
                o[oscNode.oscNode.type] = oscNode;
                return o;
            },{});

        /*
         * Wire osc nodes to their gain nodes and their gain nodes to the master gain 
         */
        Object.keys(this.oscillators).forEach(oscName => {
            let oscNode = this.oscillators[oscName];
            oscNode.oscNode.connect(oscNode.gainNode);
            oscNode.gainNode.connect(masterGain);
            oscNode.oscNode.start();
        });
            
    }

    changeFrequency(newValue) {
        Object.keys(this.oscillators).forEach(function(oscName) {
            this.oscillators[oscName].osc.frequency.value = newValue; 
        }); 
    }

    changeVolume(){
        masterGain.gain.volume += offset;
    }

}
