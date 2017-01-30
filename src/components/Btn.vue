<template>
    <div class="button" v-on:click="adjust">
        <h1>{{ buttonLabel }}</h1>
    </div>
</template>

<style>
    
    .button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        border-radius: 15%;
        width: 40px;
        background: black;
        margin-left: 5px;
        margin-right: 5px;
    }
    h1 {
        font-size: 1em;
        color: whitesmoke;
    }

</style>

<script>
    import store from '../store';

    export default {
        props: ['buttonLabel'],
        computed: {}, 
        methods: {
            adjust: function() {
                this.$emit('adjust');
            }
        }, 
    };
</script>
