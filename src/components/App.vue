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
                this.soundEngine.settings.oscillators[waveform].active = !this.soundEngine.settings.oscillators[waveform].active; 
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
                this.localStorage.data.currentPresetName = name;
                this.localStorage.data.currentPreset = this.localStorage.data.presets[ name ];
            },
            newPreset({ name }) {
                const settings = this.localStorage.data.currentPreset;
                this.localStorage.addPreset(name, settings); 
            }
        },
        watch: {
            // when preset changes, rebind it to the sound engine settings
            //preset: function() {
            //    this.soundEngine.settings = this.preset;
            //}
        },
        computed: {
            //preset: function() {
            //    return this.localStorage.config.currentPreset;
            //}
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
