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
        display: inline-flex;
    }
    .octave-up,
    .octave-down {
        border-radius: calc(80px/20);
        color: whitesmoke;
        font-size: xx-small;
        display: flex;
        align-items: center; 
        justify-content: center;
        height: 20px;
        width: 80px;
        background: black;
        border: 1px solid black;
        font-family: Arial;
    }
    .octave-up {
        margin-right: 10px;
    }
    .octave-down {
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
