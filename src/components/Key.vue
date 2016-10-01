<template>
<div class="key" 
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

    import Note from './Note';

    export default {
        props: ['note'],
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
            playNote: function() {
                masterGain.gain.value = 0.2;
            },
            stopNote: function() {
                masterGain.gain.value = 0;
            }
        },
    };

</script>
