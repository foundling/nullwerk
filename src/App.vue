<template>
    <div class="synth-workstation">
        <synthesizer></synthesizer>
    </div>
</template>

<style>
    .synth-workstation {
        height: 100%;
        width: 100%;
    }
</style>

<script>

    // vue components

    import {
        Synthesizer
    } from './instruments';

    export default {
        name: 'App',
        components: {
            Synthesizer
        }
    };

</script>
