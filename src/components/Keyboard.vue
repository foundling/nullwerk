<template>
    <div class="keyboard">
        <key 
            v-for="index in 25" 
            :index="index - 1" ></key>
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
        components: { Key: Key },
    };
</script>
