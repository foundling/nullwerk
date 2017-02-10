<template>
    <div class="led-container-inner">
        <div 
        v-bind:class="{active: isActive}"
        v-bind:style="{background: color, width: diameter}"
        class="led"></div> 
    </div>
</template>

<style scoped>

    .led-container-inner {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
    }
    .led {
        display: inline-flex;
        padding-bottom: 100%;
        height: auto;
        margin: 5px;
        padding: 5px;
        border-radius: 50%;
        opacity: 0.2;
    }

    .led.active {
        opacity: 1;
        border: 1px solid white;
    }
</style>

<script>
    import store from '../store';

    export default {
        name: 'Led',
        props: [ 'color', 'octave', 'currentOctave', 'diameter' ],
        computed: {
            isActive: function() { 
                return this.octave === this.currentOctave;
            }
        }, 
        methods: {}, 
    };
</script>
