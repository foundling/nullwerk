<template>
    <div class="sequencer">
        <div class="sequencer-controls"></div>
        <div class="sequencer-buttons">
            <LED 
                v-for="step in steps"
                diameter="15%"
                v-bind:color="preset.color">
            </LED>
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
        width: 100%;
        height: 50%;
        background: rgb(40,40,40);
    }
    .sequencer-buttons {
        width: 100%;
        height: 50%;
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

    import {

        Btn,
        LED

    } from '../components';

    import TimeEngine from '../services/TimeEngine';
    const timeEngine = new TimeEngine();

    export default {
        name: 'Sequencer',
        data: function() {

            return {
                steps: [ ...Array(8).keys() ],
                preset: {
                    color: 'white'
                }
            };

        },
        props: {
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
