<template>
<div class="synth-container">
        <div class="master-pitch-container">
            <div class="led-container">
                <label>Octave</label>
                <led 
                v-for="led in leds" 
                v-bind:color="led.color" 
                v-bind:currentOctave="currentOctave" 
                v-bind:octave="led.octave"></led>
            </div>
            <div class="octave-buttons-container">
                <btn 
                button-label="-" 
                v-on:adjust="adjustOctave(-1)">
                </btn>
                <btn 
                button-label="+" 
                v-on:adjust="adjustOctave(+1)">
                </btn>
            </div>
        </div>
        <div class="waveforms-and-options-container">
            <div class="waveforms-container">
                <label>Waveforms</label>
                <knob></knob>
                <knob></knob>
                <knob></knob>
                <knob></knob>
            </div>
            <div class="waveforms-options-container">
                <label>Waveform Options</label>
                <knob></knob>
                <knob></knob>
                <knob></knob>
                <knob></knob>
            </div>
        </div>
        <div class="master-volume-container">
            <label>Master Volume</label>
            <!--
            

            <volume></volume>

            -->
            <knob diameter="150%"></knob>
        </div>
        <div class="filter-container">
            <label>Filter</label>
            <knob></knob>
            <knob></knob>
            <knob></knob>
            <knob></knob>
        </div>
       <div class="wheels-container">
            <label>Wheels</label>
            <wheel></wheel>
            <wheel></wheel>
        </div>
        <div class="envelope-container">
            <label>Envelope</label>
            <slider></slider>
            <slider></slider>
            <slider></slider>
            <slider></slider>
        </div>
        <div class="lfo-container">
            <label>LFO-Container</label>
            <knob></knob>
            <knob></knob>
            <knob></knob>
            <knob></knob>
        </div>
        <div class="sequencer-container">
            <label>Sequence</label>
        </div>
    <div class="keyboard-container">
        <label>Octave</label>
        <keyboard></keyboard>
    </div>
</div>
</template>

<style>
    html, body, * {
        margin: 0px;
        padding: 0px;
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
    .master-pitch-container {
        flex-direction: column;
        background: gray;
    }
    .led-container {
        padding-bottom: 20px;
    }
    .octave-buttons-container {
        display: inline-flex;
        vertical-align: bottom;
    }
    .waveforms-and-options-container {
        background: lightgreen;
        flex-direction: column;
    }
    .waveforms-container,
    .waveforms-options-container {
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

    @media(max-width: 500px) {
        .keyboard-container {
            transform: rotate(90deg);
            width: 100%;
        }
    }
</style>

<script>

import store from './store';

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
            leds: [
                { color: 'red', octave: -2 },
                { color: 'yellow', octave: -1 },
                { color: 'green', octave: 0 },
                { color: 'yellow', octave: 1 },
                { color: 'red', octave: 2 },
            ]
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
