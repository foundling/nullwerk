<template>

    <div>

        <!-- SELECT  -->
        <i class="save-icon fa fa-save"></i>
        <select 
        v-show="state === 'select'">

            <option v-for="preset in presets"> {{ preset.name }} </option>
            <option>new preset</option>

        </select>

        <!-- INPUT  -->
        <div 
        v-show="state === 'save'"
        class="input-container">

            <input 
            v-model:value="inputValue">
            </input>

            <i 
            v-on:click="savePreset" 
            class="close-input fa fa-close"></i>

            <i 
            v-on:click="cancelSave" 
            class="close-input fa fa-check"></i>

        </div>

    </div>

</template>

<style>
    i.save-icon,
    select {

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 5%;
        margin-bottom: 5%;

    }
</style>

<script>

    export default {

        components: {},
        props: {
            presets: Object,
        },
        data: function() {

            return {

                state: 'select',
                inputValue: 'abc'

            };

        },
        methods: {
            savePreset: function() {

                this.$emit('addpreset', {
                    name: this.inputValue.trim() 
                }); 

                this.inputValue = '';
                this.state = 'select'

            }, 
            loadNewPreset: function() {
                this.$emit('loadpreset', { name: this.currentPreset });
            },
            computed: {
                currentPreset: function() {
                    return this.preset.name;
                }
            },
            cancelSave: function() {
                this.state = 'select';
            } 
        }


    };

</script>

