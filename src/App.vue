<template>
<div class="synth-container">

        <!--Master Pitch-->
        <div class="master-pitch-container">
            <div 
                title="octave meter"
                class="led-container">

                <led 
                diameter="15%"
                v-for="led in leds" 
                v-bind:color="led.color" 
                v-bind:currentOctave="currentOctave" 
                v-bind:octave="led.octave"></led>

            </div>
            <div 
            title="octave"
            class="octave-buttons-container">
                <btn 
                title="octave +1"
                class="octave-button-up" 
                v-on:adjust="adjustOctave(+1)">
                    <i 
                    v-bind:style="{color: palette.white}" 
                    class="fa fa-caret-up" 
                    slot="label"></i>
                </btn>
                <btn 
                title="octave -1"
                class="octave-button-down" 
                v-on:adjust="adjustOctave(-1)">
                    <i 
                    v-bind:style="{color: palette.white}" 
                    class="fa fa-caret-down" 
                    slot="label"></i>
                </btn>
            </div>
        </div>

        <!-- master volume knob -->
        <div 
            title="Master Volume. Swipe up to increase. Swipe down to decrease. Tap to mute."
            class="master-volume-container">

            <div class="volume-container">
                <led color="red"></led>
                <led color="red"></led>
                <led color="red"></led>
                <led color="red"></led>
                <led color="red"></led>
            </div>

            <knob
            color="black" 
            diameter="60%"></knob>

        </div>

        <!-- waveforms -->
        <div class="waveforms-and-options-container">
            <div class="waveforms-container">
                <knob 
                v-bind:bg-image="waveForms.square.img"
                diameter="25%">
                </knob>
                <knob 
                v-bind:bg-image="waveForms.triangle.img"
                diameter="25%"></knob>
                <knob 
                v-bind:bg-image="waveForms.sawtooth.img"
                diameter="25%"></knob>
                <knob 
                v-bind:bg-image="waveForms.sine.img"
                diameter="25%"></knob>
            </div>
            <div class="waveform-level-container">
                <slider 
                direction="horizontal"
                barHeight="100%"
                barWidth="10%">
                </slider>
            </div>
        </div>
        <div class="filter-container">
        </div>
       <div class="wheels-container">
            <wheel></wheel>
            <wheel></wheel>
        </div>
        <div class="envelope-container">
            <slider
                direction="vertical"
                barHeight="10%"
                barWidth="100%"></slider>
            <slider
                direction="vertical"
                barHeight="10%"
                barWidth="100%"></slider>
            <slider
                direction="vertical"
                barHeight="10%"
                barWidth="100%"></slider>
            <slider
                direction="vertical"
                barHeight="10%"
                barWidth="100%"></slider>
        </div>
        <div class="lfo-container">
            <knob></knob>
            <knob></knob>
            <knob></knob>
            <knob></knob>
        </div>
        <div class="sequencer-container">
        </div>
    <div class="keyboard-container">
        <keyboard></keyboard>
    </div>
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
        font-family: Helvetica;
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
    .wheels-container,
    .envelope-container,
    .sequencer-container,
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
        align-items: center;
        justify-content: center;
        height: 50%;
        width: 100%;
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
        }
    }
</style>

<script>

import store from './store';
const palette = {
    red: 'red',
    yellow: 'yellow',
    lime: 'lime',
    black: 'rgb(40,40,40)',
    white: 'whitesmoke'
}

import Keyboard from './components/Keyboard';
import Volume from './components/Volume';
import Octave from './components/Octave';
import Slider from './components/Slider';
import Knob from './components/Knob';
import Wheel from './components/Wheel';
import Btn from './components/Btn';
import Led from './components/Led';

export default {
    data: function() {
        return {
            palette,
            leds: [
                { color: palette['red'], octave: 2 },
                { color: palette['yellow'], octave: 1 },
                { color: palette['lime'], octave: 0 },
                { color: palette['yellow'], octave: -1 },
                { color: palette['red'], octave: -2 },
            ],
            volumeKnobs: [
                {},
                {},
                {},
                {},
            ],
            waveForms: {
                square: {
                    img: '/static/img/square_wave_outline.png' 
                },
                triangle: {
                    img: '/static/img/triangle_wave_outline.png' 
                },
                sawtooth: {
                    img: '/static/img/sawtooth_wave_outline.png' 
                },
                sine: {
                    img: '/static/img/sine_wave_outline.png' 
                }
            }


        }
    },
    methods: {
        adjustOctave(direction) { 
            this.$store.commit('SET_OCTAVE', { direction: direction });
        }
    },
    computed: {
        currentOctave() { 
            return this.$store.getters.currentOctave;
        }
    },
    components: { 

        Keyboard, 
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
