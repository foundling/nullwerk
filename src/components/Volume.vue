<template>
    <div class="volume-controls">
        <div 
            v-on:click="setMasterVolume(0.1)"
            class="volume-up"> 
            <h1>^</h1>
        </div> 

        <div 
            v-on:click="setMasterVolume(-0.1)"
            class="volume-down"> 
            <h1>v</h1>
        </div> 
        <h1>{{ masterVolume }}</h1>
    </div>
</template>

<style>
    .volume-controls {
        display: flex;
    }
    .volume-up,
    .volume-down {
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
        computed: {
            masterVolume() {
                return this.$store.state.soundEngine.getMasterVolume(); 
            }
        },
        methods: {
            setMasterVolume(amount) {
                return this.$store.state.soundEngine.setMasterVolume(amount); 
            }
        }
    };

</script>
