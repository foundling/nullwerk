<template>
<div 
    v-on:mousedown="startNote(index)"
    v-on:mouseup="stopNote(index)"
    class="key"></div> 
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
    import store from '../store';
    import FrequencyCalculator from '../services/frequencyCalculator';

    const fc = new FrequencyCalculator();


    export default {
        props: ['index'],
        components:{
        },
        data: function (){
            return {
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
            startNote(index) {
                var frequency = fc.indexToFrequency(index); 
                this.$store.state.soundEngine.playNote(frequency)
            },
            stopNote() {
                this.$store.state.soundEngine.muteNote()
            },
        }, 
    };

</script>
