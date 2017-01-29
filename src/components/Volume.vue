<template>
    <div class="volume-controls">
        <div 
            v-on:click="setMasterVolume(0.1)"
            class="volume-up"> 
            <h1>+</h1>
        </div> 

        <div 
            v-on:click="setMasterVolume(-0.1)"
            class="volume-down"> 
            <h1>-</h1>
        </div> 
    </div>
</template>

<style>
    .volume-controls {
        display: inline-flex;
    }
    .volume-up,
    .volume-down {
        border-radius: 5%;
        display: inline-flex;
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
            setMasterVolume(amount) {
                this.$store.state.soundEngine.setMasterVolume(amount); 
            }
        }
    };

</script>
