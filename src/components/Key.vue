<template>

<div class="key" v-bind:class="color" 
    v-on:mousedown="playNote" 
    v-on:mouseup="stopNote"></div> 

</template>

<style>
    .key {
        height: 400px;
        width: 5%;
        background: whitesmoke;
        border: 1px solid rgb(40,40,40); 
    }
    .black {
        background: rgb(40,40,40);
    }
</style>

<script>
    let midiDevices = [];
    // WEB MIDI
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(function (midiInterface) {

            const inputs = midiInterface.inputs.values(); 
            let input = null;
            for (input = inputs.next(); input && !input.done; input = inputs.next()) {
                console.log('device', input);
                midiDevices.push(input);
            } 
            return midiDevices;
        }).then(function(midiDevices) {
            midiDevices[1].onmidimessage = function() {
                console.log(arguments);
            };
        });
    }


    // WEB AUDIO
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
        props: ['index','color'],
        components:{
        },
        data: function (){
            return {
                blackKeys: [1,3,6,8,10,13,15,18,20,22]
            };
        },
        computed: {
            isBlackKey: function() {
                console.log(arguments);
                return {
                    black: 'black'
                }
            }
        }, 
        methods: {
            playNote: function() {
                masterGain.gain.value = 0.2;
            },
            stopNote: function() {
                masterGain.gain.value = 0;
            }
        },
    };

</script>
