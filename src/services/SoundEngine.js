export default class SoundEngine {

    constructor() {
        
        const AudioContext = window.AudioContext || window.webkitAudioContext; 
        const context = new AudioContext();
        const defaultMasterVolume = 0.2;
        const defaultOscillatorVolume = 0.0;
        const masterGain = context.createGain();
        masterGain.gain.value = defaultMasterVolume;

        this.masterGain = masterGain;
        this.oscillators = [ 'sawtooth', 'sine', 'square', 'triangle' ]
            /*
             * Build a map of oscillator name -> oscillator and gain objects
             */
            .map(function(waveformType) {
                // create oscillators from waveform name
                let oscNode = context.createOscillator();
                oscNode.type = waveformType;
                oscNode.frequency.value = 440;
                return {
                    oscNode: oscNode
                };
            })
            .map(function(oscNode) {
                
                // web audio api
                oscNode.gainNode = context.createGain();
                oscNode.gainNode.gain.value = defaultOscillatorVolume; // this is raised and lowered based on keydown events

                // my api
                oscNode.volume = oscNode.gainNode.gain.value;
                oscNode.controlLevel = oscNode.volume;
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
        masterGain.connect(context.destination);


            
    }

    setFrequency(newValue) {
        Object.keys(this.oscillators).forEach(function(oscName) {
            this.oscillators[oscName].osc.frequency.value = newValue; 
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
        console.log(this.masterGain.gain.value);
    }

    setOscillatorVolume(oscillatorName, amount) {
        this.oscillators[oscillatorName].gainNode.gain.value += amount;
    }

    muteNote() {
        this.oscillators.forEach(osc => {
            osc.level = 0;
        });
    }

    playNote() {
        this.oscillators.forEach(osc => {
            osc.level = osc.controlLevel;
        });
    }


}
