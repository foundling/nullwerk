<template>
<div class="volume-controls">
    <div class="volume-up" 
        @mousedown="adjustVolume(0.1)">
        <h1>^</h1>
    </div> 

    <div class="volume-down" 
        @mousedown="adjustVolume(-0.1)">
        <h1>v</h1>
    </div> 
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

    export default {
        components:{
        },
        data: function (){
            return {

            };
        },
        computed: {
        }, 
        methods: {
        },
    };

</script>
