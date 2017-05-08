<template>
    <div class="synth-workstation">
        <synthesizer></synthesizer>
        <!-- <sequencer></sequencer> -->
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
        Synthesizer,
        Sequencer
    } from './instruments';

    export default {
        name: 'App',
        components: {
            Synthesizer,
            Sequencer
        }
    };

</script>
