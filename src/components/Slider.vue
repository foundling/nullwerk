<template>

    <div class="slider-container"> 
        <div class="slider-slot">
            <div class="slider-bar"></div>
        </div> 
    </div>

</template>

<style>
    .slider-container {


        width: 25%;
        height: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        background: lightgray;

    }
    .slider-slot {

        position: relative;
        height: 100%;
        width: 15%;

        background: black;
        border-radius: 5%; 
        border: 1px solid black;
        height: 90%;
        width: 20%;

    }
    .slider-bar {
        position: absolute;
        background: lightgray;
        bottom: 40%;
        width: 100%;
        height: 10%;
    }

</style>

<script>
    import store from '../store';

    export default {
        data: function() {
            return {};
        },
        props: [],
        computed: {
        }, 
        methods: {
            startDrag: function() {
            }
        }, 
    };
</script>
