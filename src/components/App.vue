<template src="./AppTemplate.html"></template>
<style src="./AppStyle.scss" lang="scss"></style>
<script>

    import FastClick from 'fastclick';
    import Key from './Key';
    import Sequencer from './Sequencer';
    import Slider from './Slider';
    import Knob from './Knob';
    import Wheel from './Wheel';
    import Btn from './Btn';
    import Led from './Led';
    import PresetManager from './PresetManager';

    import SoundEngine from './../services/SoundEngine';
    import { synthConfig } from './../config/synth'; 
    import { getScreenWidth }  from './../utils';
    import palette from './../services/colorPalette';
    import Store from './../services/localStorage';

    const { ui, params } = synthConfig;
    const store = new Store({ defaults: params });
    const soundEngine = new SoundEngine();

    export default {

        data: function() {
            return {
                ui,
                palette,
                store,
                soundEngine,
                preset: null
            };
        },
        created: function() {
            this.soundEngine.settings = this.store.config.currentPreset;
        },
        mounted: function() {
            document.addEventListener('load', () => { FastClick.attach(document.body); }); 
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
                const settings = this.store.config.currentPreset;
                this.store.updatePreset(name, settings);
            },
            changePreset({ name }) {
                console.log('change preset');
                this.store.config.currentPresetName = name;
                this.store.config.currentPreset = this.store.config.presets[ name ];
            },
            newPreset({ name }) {
                const settings = this.store.config.currentPreset;
                this.store.addPreset(name, settings); 
            }
        },
        watch: {
            // when preset changes, rebind it to the sound engine settings
            preset: function() {
                this.soundEngine.settings = this.preset;
            }
        },
        computed: {
            preset: function() {
                return this.store.config.currentPreset;
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
