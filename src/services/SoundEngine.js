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
        this.masterGain.gain.value = config.masterVolume.value;
        this.savedVolumeSetting = config.masterVolume.savedValue;
        this.envelopeSettings = config.envelope;
        this.oscillatorSettings = config.oscillators;
        this.oscillators = null;
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
    get sineValue() {
        return this.oscillatorSettings.sine.value;
    }

    set sineValue(value) {
        this.oscillatorSettings.sine.value = value;
    }

    get squareValue() {
        return this.oscillatorSettings.square.value;
    }

    set squareValue(value) {
        this.oscillatorSettings.square.value = value;
    }

    get sawtoothValue() {
        return this.oscillatorSettings.sawtooth.value;
    }

    set sawtoothValue(value) {
        this.oscillatorSettings.sawtooth.value = value;
    }

    get triangleValue() {
        return this.oscillatorSettings.triangle.value;
    }

    set triangleValue(value) {
        this.oscillatorSettings.triangle.value = value;
    }

    toggleOscillatorVolume(name) {
        const osc = this.oscillatorSettings[name];
        if (osc.active) {
            osc.savedValue = osc.value;
            osc.value = 0.0;
        } else {
            osc.value = osc.savedValue;
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

    valueToTime(value){ 

        const milliseconds = 1000;
        return value * 0.1 * milliseconds;

    }

    setEnvelopeValue({ name, value }) {

        //value is between 0 and 1;
        const milliseconds = this.valueToTime(value);
        this.envelopeSettings[ name ].time = milliseconds; 

    }

    setOscillatorValue = function({ name, value }) {

        /* when oscillators get recreated, they use the values that this updates */ 
        this.oscillatorSettings[name].value = value;

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
            With web audio, notes are discardable by design. 
            so start & stop = create & destroy for a node. 
        */
        
        console.log(this.oscillators);

        this.oscillators.forEach(function(node) {
            console.log('type: ', node.osc.type, 'volume: ', node.gain.gain.value);
        });
        this.oscillators.forEach(node => node.osc.stop(0));

    }

    _createNote(fundamentalFrequency) {

        const masterGain = this.masterGain;
        const context = this.context;
        const settings = this.oscillatorSettings;

        return Object.keys(settings)
            .map(key => settings[ key ])
            .map(function(setting) {

                const node = {
                    osc: null,
                    gain: null
                };

                // init osc
                node.osc = context.createOscillator(); 
                node.osc.type = setting.name;
                node.osc.frequency.value = fundamentalFrequency;

                // init gain
                node.gain = context.createGain();
                node.gain.gain.value = setting.value;

                // connect osc to gain, gain to master gain
                node.osc.connect(node.gain);
                node.gain.connect(masterGain);

                // start osc
                node.osc.start();

                // push to oscillators array
                return node;

            });

    }
    _indexToFrequency(keyIndex) {

        /* use current octave value to generate proper fundamental frequency */

        const fundamentalFrequencyAtOctave = C4_HERTZ * Math.pow(2, this.octave);
        return fundamentalFrequencyAtOctave * Math.pow(Math.pow(2, 1/12), keyIndex); 

    }

}
