<template>
    <div 
        v-on:mousedown="startNote(index)"
        v-on:mouseup="stopNote(index)"
        class="key {{ keyColor(index) }}-key">
    </div> 
</template>

<style>
    .key {
        height: 400px;
        width: 5%;
        border: 1px solid rgb(40,40,40); 
    }
    .black-key {
        background: rgb(40,40,40);
    }
    .white-key {
        background: whitesmoke;
    }
</style>

<script>
    import store from '../store';

    export default {
        props: ['index'],
        computed: {
            keyColor: function(index) {
            
                const whiteKeys = [
                    0,2,4,5,7,9,11,12,
                    13,15,17,18,20,22,24,25
                ];
                
                return (index in whiteKeys) ? 'white' : 'black';

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
