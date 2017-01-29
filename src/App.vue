<template>
<div class="synth-container">
        <div class="master-pitch-container">
            <div class="LED-container">
                <LED v-bind="{octave: -2}" color="red"></LED>
                <LED v-bind="{octave: -1}" color="yellow"></LED>
                <LED v-bind="{octave: 0}" color="green"></LED>
                <LED v-bind="{octave: 1}" color="yellow"></LED>
                <LED v-bind="{octave: 2}" color="red"></LED>
            </div>
            <octave></octave>
        </div>
        <div class="waveforms-and-options-container">
            <div class="waveforms-container">
                <knob></knob>
                <knob></knob>
                <knob></knob>
                <knob></knob>
            </div>
            <div class="waveforms-options-container">
                <knob></knob>
                <knob></knob>
                <knob></knob>
                <knob></knob>
            </div>
        </div>
        <div class="filter-container">
            <knob></knob>
            <knob></knob>
            <knob></knob>
            <knob></knob>
        </div>
        <div class="master-volume-container">
            <volume></volume>
        </div>
        <div class="wheels-container">
            <wheel></wheel>
            <wheel></wheel>
        </div>
        <div class="envelope-container">
            <slider></slider>
            <slider></slider>
            <slider></slider>
            <slider></slider>
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
        min-width: 250px;
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
    .LED-container {
        padding-bottom: 20px;
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
        }
    }
</style>

<script>

import Keyboard from './components/Keyboard';
import Volume from './components/Volume';
import Octave from './components/Octave';
import Slider from './components/Slider';
import Knob from './components/Knob';
import Wheel from './components/Wheel';
import Button from './components/Button';
import LED from './components/LED';

export default {
    components: { 

        Keyboard, 
        Volume, 
        Octave, 
        Slider, 
        Knob,
        Wheel, 
        LED

    }
};

</script>
