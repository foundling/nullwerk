<template>

<div 
    class="knob-container" 
    v-bind:style="{width: diameter }">

    <div 
    draggable="true"
    class="knob"
    v-on:click="engageKnob"
    v-bind:style='{ backgroundImage: "url(" + bgImage + ")", transform: "rotate(" + degreesRotated + "deg)" }'></div>

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
        props: [ 

            'diameter', 
            'toggleable', 
            'color', 
            'bgImage',
            'width' 

        ],
        data: function() {
            return {
                degreesRotated: 0,
                dragData: {
                    startY: null,
                    currentY: null
                }
            };
        },
        methods: {
            engageKnob(){
                console.log(this.name);
            },
            disengageKnob(){
                console.log(this.name);
            },
        } 
    };
</script>
