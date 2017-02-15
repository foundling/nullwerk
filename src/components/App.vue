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

    const { ui, sound } = synthConfig;

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
