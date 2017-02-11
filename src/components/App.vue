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
            toggleWaveformActive({ waveform }) {

                for (let i = 0, max = this.synth.waveforms.length; i < max; ++i) {
                    if (this.synth.waveforms[i].name === waveform) {
                        this.synth.waveforms[i].slider.active = !this.synth.waveforms[i].slider.active;
                    }
                };
            },
            adjustOctave(direction) { 
                this.soundEngine.adjustOctave(direction);
            },
            adjustWaveformVol(payload) {
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
