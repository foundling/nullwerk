<template>
    <div 
        v-on:mousedown="startNote(index)"
        v-on:mouseup="stopNote(index)"
        v-bind:class="{ 'black-key': isBlackKey }"
        class="key">
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
        props: ['index', 'blackKeys'],
        computed: {
            isBlackKey: function() {
                return this.blackKeys.includes(this.index);
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
