<template>
    <div class="keyboard">
        <key v-for="index in 25" :index="index - 1" ></key>
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
</style>

<script>
    import Key from './Key';
    import Note from './Note.js';
    const note = new Note();

    console.log(note);
    export default {
        components: {
            Key: Key
        },
        data: function() {
            return {
            };
        }
    };
</script>
