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
        height: 100%;
        width: 100%;
        background: whitesmoke;
        display: flex;
        align-items: center;
        justify-items: center;
        position: relative;
    }
    @media(max-width: 500px) {
        .keyboard {
            /*
           -webkit-transform: translateZ(0);
           -moz-transform: translateZ(0);
           -ms-transform: translateZ(0);
           -o-transform: translateZ(0);
           transform: translateZ(0);

           -webkit-backface-visibility: hidden;
           -moz-backface-visibility: hidden;
           -ms-backface-visibility: hidden;
           backface-visibility: hidden;

           -webkit-perspective: 1000;
           -moz-perspective: 1000;
           -ms-perspective: 1000;
           perspective: 1000;
           */
        }
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
