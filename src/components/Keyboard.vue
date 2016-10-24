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
        width: 90%;
        background: whitesmoke;
        display: flex;
        align-items: center;
        justify-items: center;
    }
</style>

<script>
    import Key from './Key';

    export default {
        data: function() {
            return {

                blackKeys: [
                    1, 3, 6, 8, 10,
                    12, 14, 17, 19, 21,
                    23
                ]

            };
        },
        components: { Key: Key },
    };
</script>
