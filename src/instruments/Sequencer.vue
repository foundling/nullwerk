<template>
    <div class="sequencer">
        <div class="sequencer-controls"></div>
        <div class="sequencer-buttons"></div>
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

    import {

        Btn,
        LED

    } from './../components';

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
