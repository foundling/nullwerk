import MIDI from './midi';

const C4_HERTZ = 261.626; 

const MAX_VOLUME = 0.4;
const MIN_VOLUME = 0.0;
const MAX_OCTAVE = 2;
const MIN_OCTAVE = -2;

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

    set octave(octave) {

        if (octave > MAX_OCTAVE || octave < MIN_OCTAVE) return;
        this.currentOctave = octave;

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
        } 
        else {
            this.masterGain.gain.value = this.savedVolumeSetting;
        }

        this.active = !this.active;
    }

    setEnvelopeValue({ name, value }) {

        //value is between 0 and 1;
        this.envelopeSettings[ name ].value = value; 

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


    envelopeValueToDuration(name, val) {

        const normalizers = {
            attack: val => val * 3,
            decay: val => val * 6,
            release: val => val * 6,
        };

        return normalizers[name](val);
    }

    muteNote() {
        
        /* 
            With web audio, notes are discardable by design. 
            so start & stop = create & destroy for a node. 
        */
        const normalizedReleaseDur = this.envelopeValueToDuration('release', this.envelopeSettings.release.value);
        const releaseTime = this.context.currentTime + normalizedReleaseDur; 

        this.oscillators.forEach(osc => {
            // release time: ramp from sustain level down to 0 in <release time> seconds 
            // and stop the note
            osc.gain.gain.linearRampToValueAtTime(0, releaseTime);  
            //this.oscillators.forEach(node => node.osc.stop(releaseTime + 0.01));

        });


        // release happens here. ramp value down to 0.
        // then stop note.
        //const releaseTime = envelope.release.value;

    }

    _createNote(fundamentalFrequency) {

        const masterGain = this.masterGain;
        const context = this.context;
        const oscillators = this.oscillatorSettings;
        const envelope = this.envelopeSettings;
        const that = this;

        return Object.keys(oscillators)
            .map(key => oscillators[ key ])
            .map(function(oscillator, index) {

                const node = {
                    osc: null,
                    gain: null
                };

                // init osc
                node.osc = context.createOscillator(); 
                node.osc.type = oscillator.name;
                node.osc.frequency.value = fundamentalFrequency;

                // init gain
                node.gain = context.createGain();
                node.gain.gain.value = 0;

                // set attack, decay times and sustain level
                const attackTime = context.currentTime + that.envelopeValueToDuration('attack', envelope.attack.value);
                const decayTime = attackTime + that.envelopeValueToDuration('decay', envelope.decay.value);
                const sustainLevel = envelope.sustain.value * oscillator.value; 

                // ramp from 0 to peak in <attack time> seconds 
                node.gain.gain.linearRampToValueAtTime(oscillator.value, attackTime);

                // ramp from peak to sustain level in <decay time> seconds 
                node.gain.gain.linearRampToValueAtTime(sustainLevel, decayTime);

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
