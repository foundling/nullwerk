<template>
<div 
    v-on:mousedown="playNote" 
    v-on:mouseup="stopNote" 
    class="key"></div>
</template>

<style>
    .key {
        height: 400px;
        width: 150px;
        background: whitesmoke;
        border: 1px solid rgb(40,40,40); 
    }
</style>

<script>
    const AudioContext = window.AudioContext||window.webkitAudioContext; 
    const context = new AudioContext();
    const triangle = context.createOscillator();
    const square = context.createOscillator();
    const masterGain = context.createGain();
    masterGain.gain.value = 0;

    triangle.frequency.value = 220;
    triangle.type = 'triangle';
    triangle.start();

    square.frequency.value = 438;
    square.type = 'square';
    square.start();

    /* connections */
    triangle.connect(masterGain);
    square.connect(masterGain);
    masterGain.connect(context.destination);

    export default {
        data: function (){
            return {};
        },
        methods: {
            playNote: function() {
                masterGain.gain.value = 0.2;
            },
            stopNote: function() {
                masterGain.gain.value = 0;
            }
        }
    };

</script>
