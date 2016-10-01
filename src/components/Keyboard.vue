<template>
    <div class="keyboard">
        <key color="white"></key>
        <key color="black"></key>
        <key color="white"></key>
        <key color="black"></key>
        <key color="white"></key>
        <key color="white"></key>

        <key color="black"></key>
        <key color="white"></key>
        <key color="black"></key>
        <key color="white"></key>
        <key color="black"></key>
        <key color="white"></key>
        <key color="white"></key>

        <key color="black"></key>
        <key color="white"></key>
        <key color="black"></key>
        <key color="white"></key>
        <key color="white"></key>

        <key color="black"></key>
        <key color="white"></key>
        <key color="black"></key>
        <key color="white"></key>
        <key color="black"></key>
        <key color="white"></key>
        <key color="white"></key>
    </div>
</template>

<style>
    .keyboard {
        height: 400px;
        width: 90%;
        background: whitesmoke;
        display: flex;
        align-items: center;
        justify-items: center;
    }
    .key {
        border-radius: 5px;
    }

    /* 2,4,7,9,11*/
    .key:nth-child(){
    }

</style>

<script>
    import Key from './Key';
    export default {
        components: {
            Key: Key
        },
        data: function() {
            return {
                keys: [
                    
                ]
            };
        }
    };
</script>
