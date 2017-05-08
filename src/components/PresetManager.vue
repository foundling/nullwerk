<template>

    <div>

        <h1 class="preset-name">
            preset:  <span>{{ presetData.currentPresetName }}</span> 
        </h1>

        <!-- SELECT PRESET -->
        <i 
        v-on:click="updatePreset"
        class="save-icon fa fa-save">
        </i>

        <select 
        v-show="state === 'select'"
        v-model="selected"
        v-on:change="changePreset">

            <option 
            v-for="(preset, key) in presetData.presets" 
            v-bind:value="key">
                {{ key }}
            </option>

            <option value="new">Save New Preset</option>

        </select>

        <!-- ADD NEW PRESET  -->
        <div 
        v-show="state === 'new'"
        class="input-container">

            <input v-model:value="inputValue"></input>

            <i 
            v-on:click="cancelSave" 
            class="close-input fa fa-close"></i>

            <i 
            v-on:click="newPreset" 
            class="close-input fa fa-check"></i>

        </div>

    </div>

</template>

<style>
    i.save-icon,
    select,
    h1.preset-name {

        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 5%;
        margin-bottom: 5%;

    }
    h1.preset-name {
        display: flex;
        flex-direction: row;
    }
</style>

<script>

    import Vue from 'vue';

    export default {

        components: {},
        props: {
            presetData: {
                type: Object,
            }
        },
        data: function() {

            return {

                state: 'select', // 'select' or 'new'  
                inputValue: '', 
                selected: this.presetData.currentPresetName,

            };

        },
        methods: {
            newPreset: function() {
                this.$emit('NEW_PRESET', { name: this.inputValue.trim() }); 
                this.inputValue = '';
                this.state = 'select';
            }, 
            changePreset: function(e) {

                if (this.selected === 'new') {
                    this.state = 'new';
                    return;
                }

                this.$emit('CHANGE_PRESET', { name: this.selected });
            },
            cancelSave: function() {
                this.selected = 'default';
                this.state = 'select';
            },
            updatePreset: function() {
                this.$emit('UPDATE_PRESET', { name: this.presetData.currentPresetName });
            }
        }

    };

</script>
