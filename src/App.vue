<template>
<div>
    <volume></volume>
    <octave></octave>
    <keyboard></keyboard>
</div>
</template>

<style>
</style>

<script>
import Keyboard from './components/Keyboard.vue';
import Volume from './components/Volume.vue';
import Octave from './components/Octave.vue';

export default {
    components: { Keyboard, Volume, Octave }
};

</script>
