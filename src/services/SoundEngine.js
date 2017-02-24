import MIDI from './midi';

const C4_HERTZ = 261.626; 
const MAX_VOLUME = 0.4;
const MIN_VOLUME = 0.0;
const MAX_OCTAVE = 2;
const MIN_OCTAVE = -2;

export default class SoundEngine {

    constructor() {

        // init Web Audio and WebMidi  */

        this.context = new (window.AudioContext || window.webkitAudioContext)(); 
        this.MIDIAccess = MIDI.init();
        if (this.MIDIAccess) {
            this.MIDIAccess.then(this.onMIDIConnect, this.onMIDIFail);
        }

        /* Instantiate Properties That don't rely on synth config. */

        this.masterGain = this.context.createGain();
        this.masterGain.connect(this.context.destination);

    }

    export() {
        return this.settings;
    }

    /* MIDI Connections and event handlers */
    onMIDIStateChange = (event) => {
        const newState = event.target.state;
        console.log(`MIDI state changed to ${ state }!`); 
    }

    onMIDIMessage = (msg) => {

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

    onMIDIConnect = (midiAccess) => {

        const inputs = midiAccess.inputs.values();

        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {

            input.value.onmidimessage = this.onMIDIMessage;
            input.value.onmidistatechange = this.onMIDIStateChange;

        }

    }

    onMIDIFail = (error) => {

        console.log(`Midi Fail! Error Name:  ${error.name}`);
        console.log(error);

    }

    fromMIDI = (noteNumber) => {
        const freq = Math.pow(2, (noteNumber - 69)/12) * C4_HERTZ;
        return freq;
    }

    noteOn(noteNumber, velocity) {
        const frequencyAtKey = this.fromMIDI(noteNumber);
        this.playNote(null, frequencyAtKey);
    }

    noteOff() {
        this.muteNote();  
    }

    /* Waveform Getters and Setters */

    get sineValue() {
        return this.settings.oscillators.sine.value;
    }
    get squareValue() {
        return this.settings.oscillators.square.value;
    }
    get sawtoothValue() {
        return this.settings.oscillators.sawtooth.value;
    }
    get triangleValue() {
        return this.settings.oscillators.triangle.value;
    }

    set sineValue(value) {
        this.settings.oscillators.sine.value = value;
    }
    set squareValue(value) {
        this.settings.oscillators.square.value = value;
    }
    set sawtoothValue(value) {
        this.settings.oscillators.square.value = value;
    }
    set triangleValue(value) {
        this.settings.oscillators.triangle.value = value;
    }

    /* Envelope Getters and Setters */

    get attackValue() {
        return this.settings.envelope.attack.value;
    }
    get decayValue() {
        return this.settings.envelope.decay.value;
    }
    get sustainValue() {
        return this.settings.envelope.sustain.value;
    }
    get releaseValue() {
        return this.settings.envelope.release.value;
    }

    set attackValue(value) {
        this.settings.envelope.attack.value = value;
    }
    set decayValue(value) {
        this.settings.envelope.decay.value = value;
    }
    set sustainValue(value) {
        this.settings.envelope.sustain.value = value;
    }
    set releaseValue(value) {
        this.settings.envelope.release.value = value;
    }

    get octave() {
        return this.settings.octave;
    }
    get active() {
        return this.settings.active;
    }

    set octave(newOctave) {
        if (Math.abs(newOctave) > 2) return;
        this.settings.octave = newOctave;
    }

    set active(toOff) {

        if (toOff) {
            this.settings.masterVolume.savedValue = this.settings.masterVolume.value;
            this.settings.masterVolume.value = 0; 
        } else {
            this.settings.masterVolume.value = this.settings.masterVolume.savedValue;
        }

        this.settings.active = !this.settings.active;
    }



    /* Web Audio Sound Engine Functions */

    toggleOscillatorVolume(name) {
        const osc = this.settings.oscillators[ name ];
        if (osc.active) {
            osc.savedValue = osc.value;
            osc.value = 0.0;
        } else {
            osc.value = osc.savedValue;
        }
        osc.active = !osc.active;
    }

    toggleMasterVolume() {

        const masterVol = this.settings.masterVolume;
        const active = this.settings.active;

        if (active) {
            masterVol.savedValue = masterVol.value;  
            masterVol.value = 0;
        } 
        else {
            masterVol.value = masterVol.savedValue;
        }
        this.settings.active = !this.settings.active;
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

        if (this.oscillators) {
            this.oscillators.forEach(osc => {
                osc.gain.gain.linearRampToValueAtTime(0, this.context.currentTime);
                osc.osc.stop(this.context.currentTime + 0.01);
            });
        }

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
        const normalizedReleaseDur = this.envelopeValueToDuration('release', this.settings.envelope.release.value);
        const releaseTime = this.context.currentTime + normalizedReleaseDur; 

        this.oscillators.forEach(osc => {
            // release time: ramp from sustain level down to 0 in <release time> seconds 
            // and stop the note
            osc.gain.gain.linearRampToValueAtTime(0, releaseTime);  
            osc.osc.stop(releaseTime + 0.01);

        });

        // release happens here. ramp value down to 0.
        // then stop note.
        //const releaseTime = envelope.release.value;

    }

    _createNote(fundamentalFrequency) {

        const masterGain = this.masterGain;
        const context = this.context;
        const oscillators = this.settings.oscillators;
        const envelope = this.settings.envelope;
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
