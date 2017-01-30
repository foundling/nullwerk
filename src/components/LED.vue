<template>
    <div 
        v-bind:class="{active: isActive}"
        v-bind:style="{background: color}"
        class="LED"></div> 
</template>

<style>
    
    .LED {
        height: 4px;
        width: 4px;
        padding: 5px;
        border-radius: 50%;
        margin: 5px;
        display: inline-flex;
        opacity: 0.6;
    }

    .LED.active {
        opacity: 1;
        border: 1px solid whitesmoke;
    }
</style>

<script>
    import store from '../store';

    export default {
        created: function(){ 
        },
        components: {
        },
        props: ['color', 'octave', 'level', 'currentOctave'],
        computed: {
                // check current octave range in sound engine and return true if matches prop. 
                isActive: function() { return this.octave === this.currentOctave}
        }, 
        methods: {}, 
    };
</script>
