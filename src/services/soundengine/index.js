const SoundEngine = function() {

    const context = new (window.AudioContext || window.webkitAudioContext)(); 
    const masterGain = context.createGain();
    const DEFAULT_MASTER_VOLUME = 0.2;
    const DEFAULT_OSCILLATOR_VOLUME = 0.1;

    masterGain.gain.value = DEFAULT_MASTER_VOLUME;
    masterGain.connect(context.destination);

    function setMasterVolume(amount) {

        let potentialVolume = masterGain.gain.value + amount;

        if (potentialVolume > 1) {

            masterGain.gain.value = 1; 

        } if (potentialVolume < 0) {

            masterGain.gain.value = 0; 

        } else {

            masterGain.gain.value += amount;

        }

    };

    function setOscillatorVolume(name, amt) {

        this.oscillators
            .filter(node => {
                return node.name === name;
            })
            .forEach(node => {
                node.gain.gain.value += amount;
            });

    };

    function muteNote() {

        this.oscillators.forEach(node => node.osc.stop(0));

    }

    function playNote(keyIndex) {
        
        /* It's a web Audio best practice to create new oscillators on each play */

        const frequency = _indexToFrequency(keyIndex);
        this.oscillators = _createNote(frequency); 

    }


    function _createNote(frequency) {

        const oscillators = [ 

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
                node.osc.frequency.value = frequency;

                return node;

            })
            .map(node => {

                /* { oscillator node } => { oscillator & gain node } */

                node.gain = context.createGain();
                node.gain.gain.value = DEFAULT_OSCILLATOR_VOLUME; 

                return node;

            })
            .map(node => {

                /* Connect osc to gain, gain to master. start osc. */

                node.osc.connect(node.gain);
                node.gain.connect(masterGain);
                masterGain.connect(context.destination);
                node.osc.start(0);

                return node;

            });

            return oscillators;

    }

    function _indexToFrequency(keyIndex) {

        return 440 * Math.pow(Math.pow(2, 1/12), keyIndex); 

    }

    return {
        playNote,
        muteNote,
        setMasterVolume,
        setOscillatorVolume
    };

}

export default new SoundEngine(); 
