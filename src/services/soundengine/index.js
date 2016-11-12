const SoundEngine = function () {

    /*
      SoundEngine is an abstraction for the web audio api.

      Public Methods:
      
        setMasterVolume
        setOscillatorVolume
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

    setMasterVolume(DEFAULT_MASTER_VOLUME);
    masterGain.connect(context.destination);

    this.oscillators = null;
    
    /* Methods */
    
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

        this.oscillators
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
        
        this.oscillators.forEach(node => {
            node.osc.forEach(osc => {
                osc.stop(0);
            });
        });

    }

    function playNote(keyIndex) {
        
        /* In web audio, create new oscillators on each play */

        /* Key Index */
        const fundamentalFrequency = _indexToFrequency(keyIndex);
    
        /* Create a Note from 4 Waveforms */
        this.oscillators = _createNote(fundamentalFrequency); 

    }


    function _createNote(fundamentalFrequency) {

        /*
         
          Build a list of 4 objects (nodes) containing oscillator and gain properties.
          Waves:
            
            sawtooth
            sine
            square
            triangle
            
        */
      
        const oscillators = [ 
            
                /* to alter wave complexity, programmatically push to / pop from this array */
            
                'sawtooth', 
                'sine', 
                'square', 
                'triangle'

            ]
            .map(name => { 
    
                /* create a node with a name property */
                
                return { name: name };

            }) 
            .map(node => {

                /* build array of oscillators per waveform type that correspond to specified overtones */
                /* how to best specify volume? well, these overtones each will be some proportion of the overall volume */

                const overtones = [ 
                    {
                        harmonic: 1, 
                        relativeVolume: 1 
                    }, 
                    {
                        harmonic: 2, 
                        relativeVolume: 1 
                    }, 
                    {
                        harmonic: 3, 
                        relativeVolume: 1 
                    }, 
                    {
                        harmonic: 4, 
                        relativeVolume: 1 
                    }, 
                    {
                        harmonic: 5, 
                        relativeVolume: 1 
                    }, 
                    {
                        harmonic: 6, 
                        relativeVolume: 1 
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

                /* Connect array of oscillators to gain, gain to master. */

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

        return 440 * Math.pow(Math.pow(2, 1/12), keyIndex); 

    }

    return {
        
        playNote,
        muteNote,
        setMasterVolume,
        setOscillatorVolume

    };

};

export default new SoundEngine(); 
