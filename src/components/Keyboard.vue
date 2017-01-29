<template>
    <div class="keyboard">
        <key 
            v-for="index in 25" 
            :index="index - 1" 
            :blackKeys="blackKeys"></key>
    </div>
</template>

<style>
    .keyboard {
        height: 400px;
        width: 100%;
        background: whitesmoke;
        display: flex;
        align-items: center;
        justify-items: center;
        position: relative;
    }
</style>

<script>
    import Key from './Key';

    export default {
        data: function() {
            return {
                blackKeys: [
                    1, 3, 
                    6, 8, 10,
                    13,15,
                    18, 20, 22,
                ]

            };
        },
        components: { Key: Key },
    };
</script>
