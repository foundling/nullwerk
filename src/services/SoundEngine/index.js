import MIDI from './midi';

const SoundEngine = function ({ initialVolume, initialOctave }) {

    /* initializaion */
    this.active = true;
    this.octave = initialOctave;
    this.volume = initialVolume;
    this.savedVolumeSetting = null;
    this.envelopeSettings = {
        attack: {
            level: 0,
        }, 
        decay: {
            level: 0,
        }, 
        sustain: {
            level: 0,
        }, 
        release: {
            level: 0,
        }, 

    }
    this.oscillatorSettings = {
        sine: {
            level: 10,
            harmonicCount: 6 
        },
        square: {
            level: 0,
            harmonicCount: 6 
        },
        sawtooth: { 
            level: 0,
            harmonicCount: 6 
        },
        triangle: {
            level: 0,
            harmonicCount: 6 
        }
    };

    const DEFAULT_MASTER_VOLUME = initialVolume;
    const DEFAULT_OSCILLATOR_VOLUME = initialVolume; 
    const context = new (window.AudioContext || window.webkitAudioContext)(); 
    const masterGain = context.createGain();
    const c4Hertz = 261.626;

    masterGain.connect(context.destination);
    MIDI.init().then(onMIDIConnect, onMIDIFail);

    let oscillators = null;
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

    /* MIDI Connections and event handlers */

    function onMIDIStateChange(event) {
        const newState = event.target.state;
    };

    function onMIDIMessage(msg){

        // [ command and channel byte, note, velocity data ]
 
        const data = msg.data;

        const command = data[0] >> 4;
        const channel = data[0] & 0xf;
        const type = data[0] & 0xf0;
        const noteNumber = data[1];
        const velocity = data[2];

        switch(type) {
            case 144: // noteOn message
                noteOn(noteNumber, velocity);
                break;
            case 128: // noteOn message
                noteOff();
                break;
        }

    };

    function onMIDIConnect(midiAccess) {

        const inputs = midiAccess.inputs.values();

        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = onMIDIMessage;
            input.value.onmidistatechange = onMIDIStateChange;
        }

    }

    function onMIDIFail(error) {

        console.log(`Midi Fail: ${error.name} `);
        console.log(error);

    }

    function fromMIDI(noteNumber) {

        const freq = Math.pow(2, (noteNumber - 69)/12) * c4Hertz;
        return freq;

    }

    function noteOn(noteNumber, velocity) {
        console.log('note on: ', noteNumber);

        const frequencyAtKey = fromMIDI(noteNumber);
        playNote(null, frequencyAtKey);

    };

    function noteOff() {
        console.log('note off.');
        muteNote();  
    };

    function setOctave(direction) {

        if (Math.abs(direction + this.octave) > 2) return;
        this.octave += direction;

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

    function toggleMasterVolume() {

        if (this.active) {
            this.savedVolumeSetting = getMasterVolume();
            setMasterVolume(0);
        } else {
            this.setMasterVolume(this.savedVolumeSetting);
        }
        this.active = !this.active;
    }

    function getMasterVolume() {
        return masterGain.gain.value;
    }

    function setEnvelopeLevel({ name, value }) {
       this.envelopeSettings[name].level = value; 
    }

    function setOscillatorLevel({ name, value }) {
        /* when oscillators get recreated, they use the values that this updates */ 
        this.oscillatorSettings[name].level = value;
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

    function playNote(keyIndex, freq) {

        /* 
            In web audio, it's a best practice to create new oscillators on each noteOn.

            Map the key index to a frequency, depending on current octave.
    
            Create a note comprised of N oscillators for each of 4 standard waveforms. 
            N is the number of overtones per waveform. N >= 1. 
         

            If 'freq' is supplied, it's coming from MIDI.
            Otherwise, convert 'keyIndex' to freq. 

        */

        let frequencyAtKey = freq ? freq : _indexToFrequency(keyIndex);
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

                node.osc = overtones.map(overtone => {
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

        const fundamentalFrequencyAtOctave = c4Hertz * Math.pow(2, this.octave);
        return fundamentalFrequencyAtOctave * Math.pow(Math.pow(2, 1/12), keyIndex); 

    }

    return {
        
        volume: this.volume,
        octave: this.octave,
        active: this.active,
        savedVolumeSetting: this.savedVolumeSetting,
        oscillatorSettings: this.oscillatorSettings,
        envelopeSettings: this.envelopeSettings,
        playNote,
        muteNote,
        setMasterVolume,
        setOscillatorLevel,
        setEnvelopeLevel,
        setOctave,
        toggleMasterVolume

    };

};

export default SoundEngine; 
