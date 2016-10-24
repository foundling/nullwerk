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
            
                return index in [
                    1, 3, 6, 8, 10,
                    12, 14, 17, 19, 21,
                    23
                ] ? 'black' : 'white';

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
