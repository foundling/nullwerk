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
    import synthConfig from './../config/synthConfig';
    import sequencerConfig from './../config/sequencerConfig';

    import { getScreenWidth }  from './../utils';

    const soundEngine = new SoundEngine({});
    console.log(soundEngine);

    export default {

        data: function() {
            return {
                synth: synthConfig,
                sequencer: sequencerConfig,
            };
        },
        methods: {
            toggleMasterVol() {
                soundEngine.toggleMasterVolume();
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
            noteOn({ index }) {
                soundEngine.playNote(index);
                console.log('note on:', index);
            },
            noteOff({ index }) {
                soundEngine.muteNote(index);
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
