<template>
    <div 
        v-bind:class="{active: isActive}"
        v-bind:style="{background: color}"
        class="LED"></div> 
</template>

<style scoped>
    
    .LED {
        display: inline-flex;
        height: 8px;
        width: 8px;
        margin: 5px;
        padding: 5px;
        border-radius: 50%;
        opacity: 0.2;
    }

    .LED.active {
        /*border: 1px solid white; */
        opacity: 1;
    }
</style>

<script>
    import store from '../store';

    export default {
        props: ['color', 'octave', 'currentOctave'],
        computed: {
            isActive: function() { 
                return this.octave === this.currentOctave;
            }
        }, 
        methods: {}, 
    };
</script>
