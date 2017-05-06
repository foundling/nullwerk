<template>
    <div class="sequencer">
        <div class="sequencer-controls">
        </div>
        <div class="sequencer-buttons">
            <btn 
            v-on:press="dispatcher"
            v-for="button in sequencer.buttons"
            v-bind:backgroundColor="button.backgroundColor"
            v-bind:label="button.label"
            v-bind:width="100/sequencer.buttons.length"
            class="sequencer-button">
                <led slot="label" diameter="5%" color="red"></led>
                <!--<h1 
                slot="label" 
                v-bind:style="button.label"
                name="button.label">{{ button.label.content }}</h1>
                -->
            </btn>
        </div>
    </div>
</template>

<style>
    .sequencer {
        width: 100%;
        height: 40%;
        background: whitesmoke;
    }
    .sequencer-controls {
        height: 50%;
        background: rgb(40,40,40);
    }
    .sequencer-buttons {
        height: 50%;
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    .sequencer-button {
        height: 100%;
        border: 2px solid white;
    }
</style>

<script>
    import Btn from './Btn';
    import LED from './LED';

    export default {
        name: 'Sequencer',
        data: function() {
            return {
            };
        },
        props: {
            sequencer: {
                type: Object
            },
        },
        components: { 
            Btn,
            LED,
        },
        methods: {
            togglePlay() {
                console.log('toggle play');
            },
            togglePause() {
                console.log('toggle pause');
            }, 
            toggleStop() {
                console.log('toggle stop');
            },
            toggleRecord() {
                console.log('toggle record');
            },
            dispatcher() {
                let methodName = `toggle${ this.sequencer.mode[0].toUpperCase() }${this.sequencer.mode.slice(1)}`;
                this[methodName]();
            }
        }
    };
</script>
