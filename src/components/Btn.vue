<template>
    <div 
        class="button" 
        v-bind:style="buttonStyle"
        v-on:click="press">

        <slot 
        v-bind:style="buttonLabelStyle"
        name="label"></slot>

    </div>
</template>

<style>
    
    .button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
    h1 {
        font-size: 1em;
        color: whitesmoke;
    }

</style>

<script>

    export default {
        name: 'Btn',
        props: [
            'label', 
            'color',
            'backgroundColor',
            'diameter',
            'width',
            'height',
            'border'
        ],
        computed: {
            buttonStyle() {
                return {
                    backgroundColor: this.backgroundColor,
                    borderRadius: this.diameter ? this.diameter + '%' : 'none',
                    width: this.width ? this.width + '%' : this.diameter + '%', 
                    height: this.height ? this.height + '%' : this.diameter + '%',
                };
            },
            buttonLabelStyle() {
                return {
                    color: this.color,
                    width: this.diameter,
                    height: this.diameter,
                    borderRadius: '50%'
                };
            },

        },
        methods: {
            press: function() {
                this.$emit('press');
            }
        }, 
    };
</script>
