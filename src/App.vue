<template>

    <div class="synth-container">

            <!--Master Pitch Container -->
            <div class="master-pitch-container">

                <!-- Octave LED Meter -->
                <div 
                    title="octave meter"
                    class="led-container">

                    <led 
                    diameter="15%"
                    v-for="led in synth.leds" 
                    v-bind:color="led.color" 
                    v-bind:currentOctave="currentOctave" 
                    v-bind:octave="led.octave">
                    </led>

                </div>

                <!-- Octave -->
                <div 
                title="octave"
                class="octave-buttons-container">

                    <btn 
                    title="octave +1"
                    class="octave-button-up" 
                    v-on:press="adjustOctave(+1)">

                        <i 
                        v-bind:style="{ color: synth.palette.white }" 
                        class="fa fa-caret-up" 
                        slot="label">
                        </i>

                    </btn>
                    <btn 
                    title="octave -1"
                    class="octave-button-down" 
                    v-on:press="adjustOctave(-1)">

                        <i 
                        v-bind:style="{color: synth.palette.white}" 
                        class="fa fa-caret-down" 
                        slot="label">
                        </i>

                    </btn>
                </div>
            </div>

            <!-- Master Volume Knob Container -->
            <div 
                title="Master Volume. Swipe up to increase. Swipe down to decrease. Tap to mute."
                class="master-volume-container">

                <!-- Master LED Readings --> 
                <div class="volume-container">
                    <led color="red"></led>
                    <led color="red"></led>
                    <led color="red"></led>
                    <led color="red"></led>
                    <led color="red"></led>
                </div>

                <!-- Master Volume Knob -->
                <knob
                v-on:toggle="toggleMasterVol"
                color="black" 
                diameter="50%">
                </knob>

            </div>

            <!-- Waveforms -->
            <div class="waveforms-and-options-container">

                <div class="waveforms-container">
                    <knob 
                    v-for="waveform in synth.waveforms" 
                    v-on:toggle="toggleWaveformActive"
                    v-bind:active="waveform.slider.active"
                    v-bind:bg-image-active="waveform.img.active"
                    v-bind:bg-image-inactive="waveform.img.inactive"
                    v-bind:waveform="waveform.name"
                    v-bind:color="waveform.color"
                    v-bind:title="`toggle ${ waveform.name } level on / off.`"
                    diameter="25%">
                    </knob>
                </div>

                <div class="waveform-level-container">
                    <slider 
                    v-bind:level="0"
                    v-bind:name="waveform.name"
                    v-bind:title="`adjust ${ waveform.name } level.`"
                    v-on:slide="adjustWaveformVol"
                    v-for="waveform in synth.waveforms" 
                    v-bind:control-source="waveform.slider"
                    v-bind:direction="waveform.slider.direction"
                    v-bind:color="waveform.color"
                    bar-height="100%"
                    bar-width="10%">
                    </slider>
                </div>

            </div>

            <!-- Envelope -->
            <div class="envelope-container">

                <div 
                    v-for="parameter in synth.envelopeParameters"
                    class="envelope-slider-container">

                    <h1 
                    v-bind:title="parameter.name"
                    class="envelope-slider-label">{{ parameter.name | abbreviate }}</h1>

                    <slider 
                    v-on:slide="adjustEnvelopeParam"
                    v-bind:level="envelopeSettings"
                    v-bind:opacity="0.4"
                    v-bind:name="parameter.name"
                    v-bind:content="parameter.name"
                    v-bind:control-source="parameter.slider"
                    v-bind:direction="parameter.slider.direction"
                    v-bind:color="parameter.color"
                    bar-height="15%"
                    bar-width="100%"
                    v-bind:title="`adjust ${ parameter.name }.`">
                    </slider>
                </div>

            </div>

            <!-- Modulation Wheels Container -->
            <div class="wheels-container">
                <wheel></wheel>
                <wheel></wheel>
            </div>
               
            <!-- Signature Sign Container -->
            <div class="title-container">
                <h1 class="make">{{ currentVolume }}</h1>
                <h1 class="model">1</h1>
            </div>

            <!-- Keyboard Container -->
            <div class="keyboard-container">
                <keyboard
                v-on:noteone="noteOn">
                </keyboard>
            </div>

            <!-- Sequencer Container -->
            <!--
            <sequencer 
            v-bind:sequencer="sequencer">
            </sequencer>
            -->

    </div>

</template>

<style>
    html, body, * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
    html, body {
        height: 100%;
        font-family: Arial, Helvetica;
    }
    h1 {
        color: black;
        user-select: none;
    }
    .synth-container {
        height: 100%;
        width: 100%;
        font-size: 0em;
    }
    .synth-container > div > * {
        font-size: initial;
    }
    .controls-upper,
    .controls-lower {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 30%;
    }
    .master-volume-container,
    .master-pitch-container,
    .waveforms-and-options-container,
    .filter-container,
    .sequencer-container,
    .wheels-container,
    .envelope-container,
    .sequencer-container,
    .title-container,
    .lfo-container,
    .sequencer-container {
        min-width: calc(100% / 2);
        width: 25%;
        height: 30%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align:top;
    }
    .title-container {
        font-weight: 100;
        font-family: Helvetica Neue;
    }
    .envelope-slider-container { 
        border-right: 1px solid rgb(239,239,239);
        position: relative;
        width: 25%;
        height: 100%;
    }
    h1.envelope-slider-label {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: black;
    }
    h1.make,
    h1.model {
        margin-left: 10px;
        color: black;
        font-size: 5vw;
    }
    h1.model {
        margin-left: 34px;
        margin-top: -16px;
        font-size: 200px;
    }
    h1.make {
        font-weight: 100;
    }
    .wheels-container {
        background: aquamarine;
    }
    .master-volume-container {
        background: pink;
    }
    .octave-button-up,
    .octave-button-down {
        display: block;
        font-size: 4em;
    }

    .master-pitch-container {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: rgb(40,40,40);
    }
    .led-container,
    .volume-container {
        padding: 5%;
        height: 100%;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50%;

    }
    .octave-buttons-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        vertical-align: bottom;
        width: 50%;
        height: 100%;
    }
    .waveforms-and-options-container {
        background: lightgreen;
        flex-direction: column;
    }
    .waveforms-container,
    .waveform-level-container {
        display: inline-flex;
        height: 50%;
        width: 100%;
    }

    .waveform-level-container {
        position: relative;
        background: whitesmoke;
    }
    .filter-container {
        background: #e8e8e8;
    }
    .envelope-container {
        background: whitesmoke;
    }
    .lfo-container {
        background: lightblue;
    }
    .sequencer-container {
        background: yellow;
        width: 100%;
    }
    .keyboard-container {
        height: 40%;
    }

    .knob,
    .btn {
        box-shadow: 0 2px 0px 0px #afafaf;
    }
    @media(max-width: 500px) {
        .led-container {
            flex-direction: column;
        }
        .keyboard-container {
            transform: rotate(180deg);
            width: 100%;
            height: 150%;
        }
    }
</style>

<script>

    import store from './store';

    import Keyboard from './components/Keyboard';
    import Sequencer from './components/Sequencer';
    import Slider from './components/Slider';
    import Knob from './components/Knob';
    import Wheel from './components/Wheel';
    import Btn from './components/Btn';
    import Led from './components/Led';

    import synthConfig from './config/synthConfig';
    import sequencerConfig from './config/sequencerConfig';

    import { getScreenWidth }  from './utils';

    export default {

        data: function() {
            return {
                synth: synthConfig,
                sequencer: sequencerConfig,
            };
        },
        methods: {
            toggleMasterVol() {
                this.$store.commit('TOGGLE_MASTER_VOLUME');
            },
            toggleWaveformActive({ waveform }) {

                for (let i = 0, max = this.synth.waveforms.length; i < max; ++i) {
                    if (this.synth.waveforms[i].name === waveform) {
                        this.synth.waveforms[i].slider.active = !this.synth.waveforms[i].slider.active;
                    }
                };
            },
            adjustOctave(direction) { 
                this.$store.commit('SET_OCTAVE', { direction: direction });
            },
            adjustWaveformVol(payload) {
                this.$store.commit('SET_OSCILLATOR_LEVEL', payload);
            },
            adjustEnvelopeParam(payload) {
                this.$store.commit('SET_ENVELOPE_LEVEL', payload );
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
                //return this.$store.getters.currentOctave;
            },
            currentVolume() {
                //return this.$store.getters.currentVolume;
            },
            oscillatorSettings() {
                return this.$store.getters.oscillatorSettings;
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
