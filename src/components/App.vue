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
    import PresetManager from './PresetManager';

    import SoundEngine from './../services/SoundEngine';
    import { synthConfig } from './../config/synth'; 
    import { getScreenWidth }  from './../utils';
    import palette from './../services/colorPalette';
    import Store from './../services/localStorage';

    const { ui, params } = synthConfig;
    const store = new Store({ defaults: params });
    const soundEngine = new SoundEngine();
    //console.log(JSON.stringify(store.config,null, 2));

    export default {

        data: function() {
            return {
                ui,
                palette,
                store,
                soundEngine,
            };
        },
        created: function() {
            this.soundEngine.settings = this.store.config.currentPreset;
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
                this.soundEngine.settings = this.store.config.presets[name];
                console.log(JSON.stringify(this.store.config.currentPreset,null,2));
            },
            newPreset({ name }) {
                const settings = this.store.config.currentPreset;
                this.store.addPreset(name, settings); 
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
