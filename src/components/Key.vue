<template>
<div 
    v-on:mousedown="startNote(index)"
    v-on:mouseup="stopNote(index)"
    class="key">
</div> 
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
                this.$store.state.soundEngine.playNote(index)
            },
            stopNote() {
                this.$store.state.soundEngine.muteNote()
            },
        }, 
    };

</script>
