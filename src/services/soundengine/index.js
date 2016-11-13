const SoundEngine = function () {

    /*
      Public Methods:
      
        setMasterVolume
        setOscillatorVolume
        setOctave
        playNote
        muteNote

      Private Methods:

        _createNote
        _indexToFrequency

    */
    
    /* Init */

    const DEFAULT_MASTER_VOLUME = 0.2;
    const DEFAULT_OSCILLATOR_VOLUME = 0.1; 
    const context = new (window.AudioContext || window.webkitAudioContext)(); 
    const masterGain = context.createGain();
    const c4Hertz = 261.626;

    setMasterVolume(DEFAULT_MASTER_VOLUME);
    masterGain.connect(context.destination);

    let oscillators = null;
    let octave = 0;
    let waveforms = [
        {
            name: 'sine',
            on: true
        }, 
        {
            name: 'square',
            on: true
        }, 
        {
            name: 'sawtooth',
            on: true
        }, 
        {
            name: 'triangle',
            on: true
        }
    ];   

    /* Methods */
    
    function setOctave(direction) {

        octave += direction;

    }

    function setMasterVolume(amount) {
        
        /* keep in bounds of 0 and 1 */

        let potentialVolume = masterGain.gain.value + amount;

        if (potentialVolume > 1) {

            masterGain.gain.value = 1;

        } else if (potentialVolume < 0) {

            masterGain.gain.value = 0; 

        } else {

            masterGain.gain.value += amount;

        }

    }

    function setOscillatorVolume(name, amt) {

        oscillators
            .filter(node => {
                return node.name === name;
            })
            .forEach(node => {
                node.gain.gain.value += amount;
            });

    }

    function muteNote() {
        
        /* 
            
            With web audio, notes are discardable things, 
            so start & stop are create & destroy for a node. 
        
        */
        
        oscillators.forEach(node => {
            node.osc.forEach(osc => {
                osc.stop(0);
            });
        });

    }

    function playNote(keyIndex) {
        
        /* In web audio, create new oscillators on each play. */

        /* Map the key index to a frequency, depending on current octave. */
        const frequencyAtKey = _indexToFrequency(keyIndex);
        console.log(frequencyAtKey);
    
        /*
         * Create a note comprised of N oscillators for each of 4 standard waveforms. 
         * N is the number of overtones per waveform. N >= 1. 
         */

        oscillators = _createNote(frequencyAtKey); 

    }


    function _createNote(fundamentalFrequency) {

        /*
         
          Build a list of 4 objects (nodes) containing oscillator and gain properties.

          Waveforms:
            sawtooth
            sine
            square
            triangle
            
        */
      
        const oscillators = waveforms
            .filter(wf => {
                return wf.on;
            })
            .map(wf => { 
    
                /* create a node with a name property corresponding to the waveform's name */
                
                return { name: wf.name };

            }) 
            .map(node => {

                /* build array of oscillators per waveform type that correspond to specified overtones */
                /* how to best specify volume? well, these overtones each will be some proportion of the overall volume */

                const overtones = [ 
                    {
                        harmonic: 1, 
                        relativevolume: 1 
                    }, 
                    {
                        harmonic: 2, 
                        relativevolume: 1 
                    }, 
                    {
                        harmonic: 3, 
                        relativevolume: 1 
                    }, 
                    {
                        harmonic: 4, 
                        relativevolume: 1 
                    }, 
                    {
                        harmonic: 5, 
                        relativevolume: 1 
                    }, 
                    {
                        harmonic: 6, 
                        relativevolume: 1 
                    }, 
                ];

                node.osc = overtones.map((overtone) => {
                    const osc = context.createOscillator();
                    osc.type = node.name;
                    osc.frequency.value = fundamentalFrequency * overtone.harmonic; 
                    return osc;
                });

                return node;

            })
            .map(node => {

                /* give the node a gain property and initialize it */

                node.gain = context.createGain();
                node.gain.gain.value = DEFAULT_OSCILLATOR_VOLUME; 

                return node;

            })
            .map(node => {

                /* connect array of oscillators to gain, gain to master. */

                node.osc.forEach(osc => {
                    osc.connect(node.gain);
                });
                node.gain.connect(masterGain);
                masterGain.connect(context.destination);
                
                return node;
                
            })
            .map(node => {

                /* start each oscillators */
                
                node.osc.forEach(osc => {
                    osc.start(0);
                });
        
                return node;
                
            });

            return oscillators;

    }

    function _indexToFrequency(keyIndex) {

        /* use current octave value to generate proper fundamental frequency */

        const fundamentalFrequencyAtOctave = c4Hertz * Math.pow(2, octave);
        return fundamentalFrequencyAtOctave * Math.pow(Math.pow(2, 1/12), keyIndex); 

    }

    return {
        
        playNote,
        muteNote,
        setMasterVolume,
        setOscillatorVolume,
        setOctave

    };

};

export default new SoundEngine(); 
