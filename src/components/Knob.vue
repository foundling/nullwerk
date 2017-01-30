<template>

<div class="knob" v-bind:style="{ 'height': diameter || defaultDiameter }">
        <label>knob</label>
    </div> 

</template>

<style>
    
    /* 
    try this out, responsive circles: 
    http://codepen.io/nordstromdesign/pen/sJlth
    */
    .knob {
        border-radius: 50%;
        background: black;
        margin-left: 15px;
        margin-right: 15px;
        position: relative;
    }

    label {
        position: absolute;
        bottom: 0px;
    }


</style>

<script>
    import store from '../store';

    export default {
        components: {
        },
        props: ['diameter'],
        computed: {}, 
        data: function() {
            return {
                defaultDiameter: '35px'
            }
        },
        methods: {
            parseDiameter() {
                // this should either be a percentage or a pixel width.
                if (this.diameter.endsWith('%')) {
                    return parseInt(this.diameter.slice(3));
                }
                return parseFloat(this.diameter);
            }
        }, 
    };
</script>
