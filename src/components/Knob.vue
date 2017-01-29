<template>
    <div class="knob">
        <label>knob</label>
    </div> 
</template>

<style>
    
    /* 
    try this out, responsive circles: 
    http://codepen.io/nordstromdesign/pen/sJlth
    */
    .knob {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        background: black;
        margin-right: 2px;
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
        props: [],
        computed: {}, 
        methods: {}, 
    };
</script>
