<template>
    <div class="octave-controls">
        <div 
            v-on:click="setOctave(+1)"
            class="octave-up"> 
            <h1>+</h1>
        </div> 

        <div 
            v-on:click="setOctave(-1)"
            class="octave-down"> 
            <h1>-</h1>
        </div> 
    </div>
</template>

<style>
    .octave-controls {
        display: flex;
    }
    .octave-up,
    .octave-down {
        display: flex;
        align-items: center; 
        justify-content: center;
        height: 80px;
        width: 80px;
        background: darkgray;
        border: 1px solid black;
        font-family: Arial;
    }

    h1 {
        margin: 0;
        padding: 0;
    }
</style>

<script>

    import store from '../store'; 

    export default {
        methods: {
            setOctave(direction) {
                this.$store.state.soundEngine.setOctave(direction); 
            }
        }
    };

</script>
