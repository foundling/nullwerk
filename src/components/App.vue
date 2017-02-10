<template src="./AppTemplate.html"></template>
<style src="./AppStyle.scss" lang="scss"></style>
<script>

    import Keyboard from './Keyboard';
    import Sequencer from './Sequencer';
    import Slider from './Slider';
    import Knob from './Knob';
    import Wheel from './Wheel';
    import Btn from './Btn';
    import Led from './Led';

    import synthConfig from './../config/synthConfig';
    import sequencerConfig from './../config/sequencerConfig';

    import { getScreenWidth }  from './../utils';

    export default {

        data: function() {
            return {
                synth: synthConfig,
                sequencer: sequencerConfig,
            };
        },
        methods: {
            toggleMasterVol() {
            },
            toggleWaveformActive({ waveform }) {

                for (let i = 0, max = this.synth.waveforms.length; i < max; ++i) {
                    if (this.synth.waveforms[i].name === waveform) {
                        this.synth.waveforms[i].slider.active = !this.synth.waveforms[i].slider.active;
                    }
                };
            },
            adjustOctave(direction) { 
            },
            adjustWaveformVol(payload) {
            },
            adjustEnvelopeParam(payload) {
            },
            noteOn({index}) {
                console.log('note on: ', index);
            },
            noteOff() {
                console.log('note off');
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

            Keyboard, 
            Sequencer, 
            Slider, 
            Knob,
            Wheel, 
            Btn,
            Led

        }
    };

</script>
