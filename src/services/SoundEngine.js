import MIDI from './midi';

const C4_HERTZ = 261.626; 
const MAX_VOLUME = 0.4;
const MIN_VOLUME = 0.0;

export default class SoundEngine {

    constructor({ config }) {

        /* init Web Audio and WebMidi  */

        this.context = new (window.AudioContext || window.webkitAudioContext)(); 
        MIDI.init().then(this.onMIDIConnect, this.onMIDIFail);

        /* Instantiate Properties */

        this.masterGain = this.context.createGain();
        this.masterGain.connect(this.context.destination);
        this.active = config.active;
        this.currentOctave = config.octave;
        this.masterGain.gain.value = config.masterVolume.level;
        this.savedVolumeSetting = config.masterVolume.previousLevel;
        this.oscillators = null;
        this.envelopeSettings = config.envelope;
        this.oscillatorSettings = config.oscillators;
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
                this.noteOn(noteNumber, velocity);
                break;
            case 128: // noteOn message
                this.noteOff();
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
        const freq = Math.pow(2, (noteNumber - 69)/12) * C4_HERTZ;
        return freq;
    }

    noteOn(noteNumber, velocity) {
        const frequencyAtKey = fromMIDI(noteNumber);
        this.playNote(null, frequencyAtKey);
    }

    noteOff() {
        this.muteNote();  
    }

    /* Web Audio Sound Engine Functions */

    get octave() {
        return this.currentOctave;
    }

    adjustOctave(direction) {

        const newVal = this.currentOctave + direction;
        if (Math.abs(newVal)  > 2) return;
        this.currentOctave += direction;

    }

    get volume() {
        return this.masterGain.gain.value;
    }

    set volume(value) {

        if (value > MAX_VOLUME) {
            this.masterGain.gain.value = MAX_VOLUME;
        } else if (value < MIN_VOLUME) {
            this.masterGain.gain.value = MIN_VOLUME; 
        } else {
            this.masterGain.gain.value = value;
        }

    }

    /* Waveform Getters and Setters */
    get sineLevel() {
        return this.oscillatorSettings.sine.level;
    }

    set sineLevel(level) {
        this.oscillatorSettings.sine.level = level;
    }

    get squareLevel() {
        return this.oscillatorSettings.square.level;
    }

    set squareLevel(level) {
        this.oscillatorSettings.square.level = level;
    }

    get sawtoothLevel() {
        return this.oscillatorSettings.sawtooth.level;
    }

    set sawtoothLevel(level) {
        this.oscillatorSettings.sawtooth.level = level;
    }

    get triangleLevel() {
        return this.oscillatorSettings.triangle.level;
    }

    set triangleLevel(level) {
        this.oscillatorSettings.triangle.level = level;
    }

    toggleOscillatorVolume(name) {
        const osc = this.oscillatorSettings[name];
        if (osc.active) {
            osc.savedLevel = osc.level;
            osc.level = 0.0;
        } else {
            osc.level = osc.savedLevel;
        }
        osc.active = !osc.active;
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

    levelToTime(level){ 

        const milliseconds = 1000;
        return level * 0.1 * milliseconds;

    }

    setEnvelopeValue({ name, value }) {

        //value is between 0 and 1;
        const milliseconds = this.levelToTime(value);
        this.envelopeSettings[ name ].time = milliseconds; 

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

        let frequencyAtKey = freq ? freq : this._indexToFrequency(keyIndex);
        this.oscillators = this._createNote(frequencyAtKey); 

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

        this.oscillators = Object.keys(this.oscillatorSettings)
            .map(key => this.oscillatorSettings[key])
            .map(function(node) {

                /* build array of oscillators per waveform type that correspond to specified overtones */

                node.osc = node.overtones.map(function(overtone) {

                    const osc = that.context.createOscillator();
                    osc.type = node.name;
                    osc.frequency.value = fundamentalFrequency * overtone.harmonic; 
                    osc.gain = that.context.createGain();
                    osc.gain.gain.setValueAtTime(overtone.level, that.context.currentTime);

                    return osc;

                });

                return node;

            })
            .map(function(node) {

                /* give the node a gain property and initialize it */

                const oscLevel = that.oscillatorSettings[ node.name ].level;

                const attackTime = that.context.currentTime + that.envelopeSettings.attack.time;

                node.gain = that.context.createGain();
                node.gain.gain.setValueAtTime(0, that.context.currentTime);
                node.gain.gain.linearRampToValueAtTime(oscLevel, attackTime);

                return node;

            })
            .map(function(node) {

                /* connect array of oscillators to gain, gain to master. */

                node.osc.forEach(function(osc) {
                    osc.connect(osc.gain);
                    osc.gain.connect(node.gain);
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

            console.log(this.oscillators);
            return this.oscillators;

    }
    _indexToFrequency(keyIndex) {

        /* use current octave value to generate proper fundamental frequency */

        const fundamentalFrequencyAtOctave = C4_HERTZ * Math.pow(2, this.octave);
        return fundamentalFrequencyAtOctave * Math.pow(Math.pow(2, 1/12), keyIndex); 

    }

}
