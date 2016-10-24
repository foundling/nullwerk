export default class SoundEngine {

    constructor() {
        
        const context = new (window.AudioContext || window.webkitAudioContext); 
        const defaultMasterVolume = 0.2;
        const defaultOscillatorVolume = 0.0;
        const masterGain = context.createGain();

        masterGain.gain.value = defaultMasterVolume;
        masterGain.connect(context.destination);

        this.oscillators = [ 

                'sawtooth', 
                'sine', 
                'square', 
                'triangle'

            ]
            .map(name => { 
                return { name: name };
            }) 
            .map(node => {

                /* { name } -> { oscillator node } */

                node.osc = context.createOscillator();
                node.osc.type = node.name;
                node.osc.frequency.value = 440;

                return node;

            })
            .map(node => {

                /* { oscillator node } => { oscillator & gain node } */

                node.gain = context.createGain();
                node.gain.gain.value = defaultOscillatorVolume; // this is raised and lowered based on keydown events

                return node;

            })
            .map(node => {

                /* Connect osc to gain, gain to master. start osc. */

                node.osc.connect(node.gain);
                node.gain.connect(masterGain);
                node.osc.start();

                return node;

            });

    }

    setFrequency(newValue) {

        this.oscillators.forEach(function(node) {
            node.osc.frequency.value = newValue; 
        }); 

    }

    setMasterVolume(amount){

        let potentialVolume = this.masterGain.gain.value + amount;

        if (potentialVolume > 1) {
            this.masterGain.gain.value = 1; 
        } if (potentialVolume < 0) {
            this.masterGain.gain.value = 0; 
        } else {
            this.masterGain.gain.value += amount;
        }

    }

    setOscillatorVolume(name, amt) {

        this.oscillators
            .filter(node => node.name === name)
            .forEach(node => this.oscillators[oscillatorName].gain.gain.value += amount);

    }

    muteNote() {

        this.oscillators.forEach(node => node.gain.gain.value = 0);

    }

    playNote(keyIndex) {
        
        const frequency = this._indexToFrequency(keyIndex);
        this.oscillators.forEach(node => {
            node.osc.frequency.value = frequency;
            node.gain.gain.value = 0.2; 
        });

    }

    _indexToFrequency(keyIndex) {
        return 440 * Math.pow(Math.pow(2, 1/12), keyIndex); 
    }

}
