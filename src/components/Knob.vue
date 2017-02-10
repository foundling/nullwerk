<template>

<div 
    class="knob-container" 
    v-bind:style="{ width: diameter }">

    <div 
    draggable="true"
    v-on:click="toggleActive"
    v-bind:style="styleData"
    class="knob"></div>

</div> 

</template>

<style>
    
    /* responsive circles: http://codepen.io/nordstromdesign/pen/sJlth */


    .knob-container {
      position: relative;
      /* width: passed in via props as 'diameter' */
      min-width: 50px;
      max-width: 125px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5%;
    }

    .knob-label {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .knob {

        position: relative;
        border-radius: 50%;
        width: 100%;
        height: auto;
        padding-bottom: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;

        background-position: center;
        background-repeat: no-repeat;
        background-size: 40%;

    }

</style>

<script>
    import store from '../store';

    export default {
        name: 'Knob',
        props: { 

            active: {
                type: Boolean,
                default: false
            },
            diameter: String, 
            toggleable: Boolean, 
            color: String, 
            bgImageActive: String,
            bgImageInactive: String,
            width: String,
            waveform: String,

        },
        computed: {
            styleData() {
                return {
                    backgroundImage: `url(${ this.active ? this.bgImageActive : this.bgImageInactive })`,
                    backgroundColor: this.active ? this.color : 'white'
                };
            },

        },
        data: function() {
            return {};
        },
        methods: {
            toggleActive(){
                this.$emit('toggle', {
                    waveform: this.waveform
                });
            },
        } 
    };
</script>
