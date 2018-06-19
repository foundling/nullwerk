<template>
    <div class="wheel-container">
        <div class="wheel"></div>
        <div class="handle"></div>
        <div class="wheel"></div>
    </div> 

</template>

<style>
    .wheel-container {
        position: relative;
        height: 100%;
        width: 10%; 
        border: 4px solid lightgray;
        overflow-y: hidden;
    }
    .wheel {
        width: 100%;
        height: 45%;
        background: black;
    } 
    .handle {
        position: absolute;
        height: 10%;
        width: 100%;
        color: red;
    }
</style>

<script>

    export default {
        name: 'Wheel',
        props: [],
        computed: {}, 
        methods: {}, 
    };
</script>
