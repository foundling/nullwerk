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
                    v-for="led in leds" 
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
                        v-bind:style="{ color: palette.white }" 
                        class="fa fa-caret-up" 
                        slot="label">
                        </i>

                    </btn>
                    <btn 
                    title="octave -1"
                    class="octave-button-down" 
                    v-on:press="adjustOctave(-1)">

                        <i 
                        v-bind:style="{color: palette.white}" 
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
                v-on:toggle="toggleSound"
                color="black" 
                diameter="50%">
                </knob>

            </div>

            <!-- Waveforms -->
            <div class="waveforms-and-options-container">

                <div class="waveforms-container">
                    <knob 
                    v-for="waveform in waveforms" 
                    v-on:toggle="toggleWaveformSlider"
                    v-bind:active="waveform.active"
                    v-bind:bg-image-active="waveform.img.active"
                    v-bind:bg-image-inactive="waveform.img.inactive"
                    v-bind:waveform="waveform.name"
                    v-bind:color="waveform.color"
                    diameter="25%">
                    </knob>
                </div>

                <div class="waveform-level-container">
                    <slider 
                    v-for="waveform in waveforms" 
                    v-bind:waveform="waveform"
                    bar-height="100%"
                    bar-width="10%">
                    </slider>
                </div>

            </div>

            <!-- Envelope -->
            <div class="envelope-container">

                <slider 
                v-for="slider in envelope.sliders"
                direction="vertical"
                barHeight="10%"
                barWidth="100%">
                </slider>

            </div>

            <!-- Modulation Wheels Container -->
            <div class="wheels-container">
                <wheel></wheel>
                <wheel></wheel>
            </div>
               
            <!-- Signature Sign Container -->
            <div class="title-container">
                <h1 class="make">ARS</h1>
                <h1 class="model">1</h1>
            </div>

            <!-- Keyboard Container -->
            <div class="keyboard-container">
                <keyboard></keyboard>
            </div>

            <!-- Sequencer Container -->
            <sequencer 
            v-bind:sequencer="sequencer">
            </sequencer>

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
    .envelope-container > .slider-container {
        position: relative;
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
        background: orange;
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
            transform: rotate(90deg);
            width: 100%;
            margin-bottom: 100px;
        }
    }
</style>

<script>

    import store from './store';
    import synthConfig from './synthConfig';

    import Keyboard from './components/Keyboard';
    import Sequencer from './components/Sequencer';
    import Volume from './components/Volume';
    import Octave from './components/Octave';
    import Slider from './components/Slider';
    import Knob from './components/Knob';
    import Wheel from './components/Wheel';
    import Btn from './components/Btn';
    import Led from './components/Led';

    export default {

        data: () => synthConfig,
        methods: {
            adjustOctave(direction) { 
                this.$store.commit('SET_OCTAVE', { direction: direction });
            },
            toggleSound() {
                this.$store.commit('TOGGLE_MASTER_VOLUME');
                console.log(this.$store.getters.soundActive);
            },
            toggleWaveformSlider({ waveform }) {

                for (let i = 0, max = this.waveforms.length; i < max; ++i) {
                    if (this.waveforms[i].name === waveform) {
                        this.waveforms[i].active = !this.waveforms[i].active;
                    }
                };
            },
        },
        computed: {
            currentOctave() { 
                return this.$store.getters.currentOctave;
            }
        },
        components: { 

            Keyboard, 
            Sequencer, 
            Volume, 
            Octave, 
            Slider, 
            Knob,
            Wheel, 
            Btn,
            Led

        }
    };

</script>
