<template src="./AppTemplate.html"></template>
<style src="./AppStyle.scss" lang="scss"></style>
<script>

    // vue components
    import FastClick from 'fastclick';
    import Key from './Key';
    import Sequencer from './Sequencer';
    import Slider from './Slider';
    import Knob from './Knob';
    import Wheel from './Wheel';
    import Btn from './Btn';
    import Led from './Led';
    import PresetManager from './PresetManager';

    // synth configuration
    import palette from './../services/colorPalette';
    import { synthConfig } from './../config/synth'; 
    const { ui, config } = synthConfig;

    // service classes
    import SoundEngine from './../services/SoundEngine';
    import LocalStorage from './../services/LocalStorage';

    // service objects
    const localStorage = new LocalStorage({ defaults: config });
    const soundEngine = new SoundEngine({ config: localStorage.currentPreset });

    export default {

        name: 'App',
        data: function() {
            return {
                ui,
                palette,
                localStorage,
                soundEngine,
            };
        },
        created: function() {
            // this.soundEngine.settings = this.localStorage.config.currentPreset;
        },
        mounted: function() {
            document.addEventListener('load', () => { 
                FastClick.attach(document.body); 
            }); 
        },
        methods: {
            toggleMasterVol() {
                this.soundEngine.active = !this.soundEngine.active;
            },
            toggleOscillatorVol({ waveform }) {
                let waveForm = this.soundEngine.settings.oscillators[waveform]; 
                waveForm.active = !waveForm.active; 
            },
            adjustOctave(direction) { 
                this.soundEngine.octave += direction;
            },
            adjustOscillatorVolume({ name, value }) {
                this.soundEngine.settings.oscillators[ name ].value = value;
            },
            setEnvelopeValue({ name, value }) {
                this.soundEngine.settings.envelope[ name ].value = value;
            },
            noteOn({ index }) {
                this.soundEngine.playNote(index);
            },
            noteOff({ index }) {
                this.soundEngine.noteOff();
            },
            updatePreset({ name }) {
                const settings = this.localStorage.data.currentPreset;
                this.localStorage.savePreset(name, settings);
            },
            changePreset({ name }) {
                this.localStorage.changePreset(name);
            },
            newPreset({ name }) {
                const settings = this.localStorage.data.currentPreset;
                this.localStorage.savePreset(name, settings); 
            }
        },
        watch: {
            'localStorage.data': function() {
                this.soundEngine.settings = this.localStorage.currentPreset;
            }
        },
        filters: {
            abbreviate: s => s.charAt(0).toUpperCase(),
        },
        components: { 
            Btn,
            Key, 
            Knob,
            Led,
            Sequencer, 
            PresetManager,
            Slider, 
            Wheel
        }
    };

</script>
