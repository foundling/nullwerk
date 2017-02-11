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
    import * as configs from './../config';

    import { getScreenWidth }  from './../utils';

    console.log(configs);
    export default {

        data: function() {
            return {
                synth: configs.synth,
                sequencer: configs.sequencer,
                soundEngine: new SoundEngine({})
            };
        },
        methods: {
            toggleMasterVol() {
                this.soundEngine.toggleMasterVolume();
            },
            toggleOscillatorVol({ waveform }) {
                this.soundEngine.toggleOscillatorVolume(waveform);
                const targetWaveform = this.synth.waveforms.filter(wf => wf.name === waveform)[0];
                console.log(targetWaveform);
                targetWaveform.slider.active = !targetWaveform.slider.active;
            },
            adjustOctave(direction) { 
                this.soundEngine.adjustOctave(direction);
            },
            adjustOscillatorVolume({ name, value }) {
                const propName = name + 'Level';
                this.soundEngine[ propName ] = value;
            },
            adjustEnvelopeParam(payload) {
            },
            noteOn({ index }) {
                this.soundEngine.playNote(index);
                console.log('note on:', index);
            },
            noteOff({ index }) {
                this.soundEngine.muteNote(index);
                console.log('note off:', index);
            }

        },
        computed: {
            currentOctave() { 
            },
            currentVolume() {
            },
            oscillatorSettings() {
            },
            envelopeSettings() {
                return 10;
            }
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
