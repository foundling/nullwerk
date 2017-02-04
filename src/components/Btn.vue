<template>
    <div 
        class="button" 
        v-on:click="adjust">

        <slot 
        v-bind:style="{ color: color }" 
        name="label"></slot>

    </div>
</template>

<style>
    
    .button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 15%;
        width: 40px;
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
        props: [
            'buttonLabel', 
            'color'
        ],
        methods: {
            adjust: function() {
                this.$emit('adjust');
            }
        }, 
    };
</script>
