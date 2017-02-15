<template src="./AppTemplate.html"></template>
<style src="./AppStyle.scss" lang="scss"></style>
<script>

    import Key from './Key';
    import Sequencer from './Sequencer';
    import Slider from './Slider';
    import Knob from './Knob';
    import Wheel from './Wheel';
    import Btn from './Btn';
    import Led from './Led';

    import SoundEngine from './../services/SoundEngine';
    import { synthConfig } from './../config/synth'; 
    import { getScreenWidth }  from './../utils';
    import palette from './../services/colorPalette';
    import Store from './../services/localStorage';

    const { ui, sound } = synthConfig;
    const store = new Store();

    console.log(store.getConfig());

    export default {

        data: function() {
            return {
                leds: ui.leds,
                palette: palette, 
                sound: sound.synth,
                waveforms: ui.waveforms,
                envelope: ui.envelope,
                keyboard: ui.keyboard,
                soundEngine: new SoundEngine({ config: sound.synth })
            };
        },
        methods: {
            saveToLocalStorage() {
                const vueObj = this.sound;
                store.config = {
                    oscillators: {
                        sine: {
                            name: this.sound.oscillators.sine.name,
                            value: this.sound.oscillators.sine.value,
                            active: this.sound.oscillators.sine.active, 
                            overtones: this.sound.oscillators.sine.overtones
                        },
                        square: {
                            name: this.sound.oscillators.square.name,
                            value: this.sound.oscillators.square.value,
                            active: this.sound.oscillators.square.active, 
                            overtones: this.sound.oscillators.square.overtones
                        },
                        sawtooth: {
                            name: this.sound.oscillators.sawtooth.name,
                            value: this.sound.oscillators.sawtooth.value,
                            active: this.sound.oscillators.sawtooth.active, 
                            overtones: this.sound.oscillators.sawtooth.overtones
                        },
                        triangle: {
                            name: this.sound.oscillators.triangle.name,
                            value: this.sound.oscillators.triangle.value,
                            active: this.sound.oscillators.triangle.active, 
                            overtones: this.sound.oscillators.triangle.overtones
                        }
                    },
                    envelope: {
                        attack: {
                            active: this.sound.envelope.attack.active,
                            name: this.sound.envelope.attack.name,
                            value: this.sound.envelope.attack.value
                        },
                        decay: {
                            active: this.sound.envelope.decay.active,
                            name: this.sound.envelope.decay.name,
                            value: this.sound.envelope.decay.value
                        },
                        sustain: {
                            active: this.sound.envelope.sustain.active,
                            name: this.sound.envelope.sustain.name,
                            value: this.sound.envelope.sustain.value
                        },
                        release: {
                            active: this.sound.envelope.release.active,
                            name: this.sound.envelope.release.name,
                            value: this.sound.envelope.release.value
                        },
                    }
                };
                store.setConfig(storeObj);
            },
            toggleMasterVol() {
                this.soundEngine.toggleMasterVolume();
            },
            toggleOscillatorVol({ waveform }) {
                this.soundEngine.toggleOscillatorVolume(waveform);
                const targetWaveform = this.waveforms.filter(wf => wf.name === waveform)[0];
                targetWaveform.slider.active = !targetWaveform.slider.active;
            },
            adjustOctave(direction) { 
                this.soundEngine.octave += direction;
            },
            adjustOscillatorVolume({ name, value }) {
                const propName = name + 'Value';
                this.soundEngine[ propName ] = value;
            },
            setEnvelopeValue({ name, value }) {
                this.soundEngine.setEnvelopeValue({ name, value }); 
            },
            noteOn({ index }) {
                this.soundEngine.playNote(index);
            },
            noteOff({ index }) {
                this.soundEngine.noteOff();
            }
        },
        computed: {
        },
        filters: {
            abbreviate: s => s.charAt(0).toUpperCase(),
        },
        components: { 

            Key, 
            Sequencer, 
            Slider, 
            Knob,
            Wheel, 
            Btn,
            Led

        }
    };

</script>
