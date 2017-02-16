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

    const { ui, synth } = synthConfig;
    const store = new Store({ defaults: synth });


    export default {

        data: function() {
            return {
                ui: ui,
                palette: palette, 
                presets: store.config,
                soundEngine: new SoundEngine({ config: store.config })
            };
        },
        methods: {
            saveToLocalStorage() {
                store.config = this.soundEngine.export;
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
            },
            savePreset({ name }) {
                console.log(name);
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
