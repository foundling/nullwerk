import MIDI from './midi';
const C4_HERTZ = 261.626; 

export default class SoundEngine {

    constructor({ initVolume = 0.2, initOctave = 0 }) {

        /* init Web Audio and WebMidi  */

        this.context = new (window.AudioContext || window.webkitAudioContext)(); 
        MIDI.init().then(this.onMIDIConnect, this.onMIDIFail);

        /* Instantiate Properties */

        this.masterGain = this.context.createGain();
        this.masterGain.connect(this.context.destination);
        this.active = true;
        this.currentOctave = initOctave;
        this.masterGain.gain.value = initVolume;
        this.savedVolumeSetting = this.masterGain.gain.value;
        this.oscillators = null;
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
        this.waveforms = [
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
    }


    /* MIDI Connections and event handlers */
    onMIDIStateChange(event) {
        const newState = event.target.state;
        console.log(`MIDI state changed to ${ state }!`); 
    }

    onMIDIMessage(msg){

        /* [ command and channel byte, note, velocity data ] */
 
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

    }

    onMIDIConnect(midiAccess) {

        const inputs = midiAccess.inputs.values();

        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = onMIDIMessage;
            input.value.onmidistatechange = onMIDIStateChange;
        }

    }

    onMIDIFail(error) {

        console.log(`Midi Fail! Error Name:  ${error.name}`);
        console.log(error);

    }

    fromMIDI(noteNumber) {
        const freq = Math.pow(2, (noteNumber - 69)/12) * this.c4Hertz;
        return freq;
    }
    noteOn(noteNumber, velocity) {
        const frequencyAtKey = fromMIDI(noteNumber);
        playNote(null, frequencyAtKey);
    }

    noteOff() {
        muteNote();  
    }

    /* Web Audio Sound Engine Functions */

    get octave() {
        return this.currentOctave;
    }

    set octave(direction) {

        const newValue = direction + this.currentOctave;

        if (Math.abs(newValue) <= 2) {
            this.currentOctave = newValue;
        }
    }

    get volume() {
        return this.masterGain.gain.value;
    }

    set volume(value) {

        if (value > 1) {
            this.masterGain.gain.value = 1;
        } else if (value < 0) {
            this.masterGain.gain.value = 0; 
        } else {
            this.masterGain.gain.value = value;
        }

    }

    toggleMasterVolume() {

        if (this.active) {
            this.savedVolumeSetting = this.masterGain.gain.value;
            this.masterGain.gain.value = 0;
            console.log(this.masterGain.gain.value);
        } 
        else {
            this.masterGain.gain.value = this.savedVolumeSetting;
            console.log(this.masterGain.gain.value);
        }

        this.active = !this.active;
    }

    setEnvelopeLevel({ name, value }) {
       this.envelopeSettings[name].level = value; 
    }

    setOscillatorLevel = function({ name, value }) {
        /* when oscillators get recreated, they use the values that this updates */ 
        this.oscillatorSettings[name].level = value;
    }
    playNote(keyIndex, freq) {

        /* 
            In web audio, it's a best practice to create new oscillators on each noteOn.

            Map the key index to a frequency, depending on current octave.
    
            Create a note comprised of N oscillators for each of 4 standard waveforms. 
            N is the number of overtones per waveform. N >= 1. 
         

            If 'freq' is supplied, it's coming from MIDI.
            Otherwise, convert 'keyIndex' to freq. 

        */

        let frequencyAtKey = freq ? freq : _indexToFrequency(keyIndex);
        this.oscillators = _createNote(frequencyAtKey); 

    }

    muteNote() {
        
        /* 
            
            With web audio, notes are discardable things, 
            so start & stop are create & destroy for a node. 
        
        */
        
        this.oscillators.forEach(node => node.osc.forEach(osc => osc.stop(0)));

    }

    _createNote(fundamentalFrequency) {

        /*
         
          Build a list of 4 objects (nodes) containing oscillator and gain properties.

          Waveforms:
            sawtooth
            sine
            square
            triangle
            
        */
      
        const that = this;
        this.oscillators = this.waveforms
            .filter(wf => wf.on)
            .map(function(wf) { 
                /* create a node with a name property corresponding to the waveform's name */
                return { name: wf.name };
            }) 
            .map(function(node) {

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

                node.osc = overtones.map(function(overtone) {
                    console.log(fundamentalFrequency)
                    console.log(overtone)
                    const osc = that.context.createOscillator();
                    osc.type = node.name;
                    osc.frequency.value = fundamentalFrequency * overtone.harmonic; 
                    return osc;
                });

                return node;

            })
            .map(function(node) {

                /* give the node a gain property and initialize it */

                node.gain = that.context.createGain();
                node.gain.gain.value = that.DEFAULT_OSCILLATOR_VOLUME; 

                return node;

            })
            .map(function(node) {

                /* connect array of oscillators to gain, gain to master. */

                node.osc.forEach(function(osc) {
                    osc.connect(node.gain);
                });
                node.gain.connect(that.masterGain);
                that.masterGain.connect(that.context.destination);
                
                return node;
                
            })
            .map(function(node) {

                /* start each oscillators */
                
                node.osc.forEach(osc => osc.start(0));
                return node;
                
            });

            return oscillators;

    }
    _indexToFrequency(keyIndex) {

        /* use current octave value to generate proper fundamental frequency */

        const fundamentalFrequencyAtOctave = this.c4Hertz * Math.pow(2, this.octave);
        return fundamentalFrequencyAtOctave * Math.pow(Math.pow(2, 1/12), keyIndex); 

    }

}
