export default class SoundEngine {

    constructor() {
        
        const AudioContext = window.AudioContext || window.webkitAudioContext; 
        const context = new AudioContext();
        const defaultVolume = 0.6;
        const masterGain = context.createGain();
        masterGain.connect(context.destination);
        masterGain.gain.value = 0.0;
        this.masterGain = masterGain;
        this.oscillators = [ 'sawtooth', 'sine', 'square', 'triangle' ]
            /*
             * Build a map of oscillator name -> oscillator and gain objects
             */
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
                oscNode.gainNode.gain.value = defaultVolume;
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
            oscNode.gainNode.connect(this.masterGain);
            oscNode.oscNode.start();
        });

            
    }

    setFrequency(newValue) {
        Object.keys(this.oscillators).forEach(function(oscName) {
            this.oscillators[oscName].osc.frequency.value = newValue; 
        }); 
    }

    setMasterVolume(amount){
        this.masterGain.gain.value += amount;
        console.log(`volume is now ${this.masterGain.gain.value}`); 
    }

    getMasterVolume() {
        return this.masterGain.gain.value;
    }


    setOscillatorVolume(oscillatorName, amount) {
        this.oscillators[oscillatorName].gainNode.gain.value += amount;
    }

    playNote() {
    }


}
