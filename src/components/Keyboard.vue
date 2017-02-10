<template>
    <div class="keyboard">
        <key 
        v-for="index in 25" 
        :index="index - 1" 
        :blackKeys="blackKeys">
        </key>
    </div>
</template>

<style>
    .keyboard {
        height: 100%;
        width: 100%;
        background: whitesmoke;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    @media(max-width: 500px) {
        .keyboard {
            flex-direction: column; 
            height: 100%;
        }
    }
</style>

<script>
    import Key from './Key';

    export default {
        name: 'Keyboard',
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
