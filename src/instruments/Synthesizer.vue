<template>

    <div class="synth-container">

        <!--Master Pitch Container -->
        <div class="module master-pitch-container">

            <!-- Octave LED Meter -->
            <div 
                title="octave meter"
                class="LED-container">

                <LED 
                v-for="LED in ui.leds" 
                diameter="15%"
                v-bind:color="LED.color" 
                v-bind:currentOctave="localStorage.config.currentPreset.octave" 
                v-bind:octave="LED.octave">
                </LED>

            </div>

            <!-- Octave -->
            <div 
            title="octave"
            class="octave-buttons-container">

                <btn 
                title="octave +1"
                class="octave-button-up" 
                v-on:press="adjustOctave(+1)">

                    <i 
                    v-bind:style="{ color: palette.white }" 
                    class="fa fa-caret-up" 
                    slot="label" />
                    </i>

                </btn>
                <btn 
                title="octave -1"
                class="octave-button-down" 
                v-on:press="adjustOctave(-1)">

                    <i 
                    v-bind:style="{ color: palette.white }" 
                    class="fa fa-caret-down" 
                    slot="label">
                    </i>

                </btn>
            </div>
        </div>

        <!-- Master Volume Knob Container -->
        <div 
            title="Master Volume. Swipe up to increase. Swipe down to decrease. Tap to mute."
            class="module master-volume-container">

            <!-- Master LED Readings --> 
            <div class="volume-container">
                <LED color="red"></LED>
                <LED color="red"></LED>
                <LED color="red"></LED>
                <LED color="red"></LED>
                <LED color="red"></LED>
            </div>

            <!-- Master Volume Knob -->
            <knob
            v-on:toggle="toggleMasterVol"
            color="black" 
            diameter="50%">
            </knob>

        </div>

        <!-- Waveforms -->
        <div class="module waveforms-and-options-container">

            <div class="waveforms-container">
                <knob 
                v-for="waveform in ui.waveforms" 
                v-on:toggle="toggleOscillatorVol"
                v-bind:active="localStorage.config.currentPreset.oscillators[ waveform.name ].active"
                v-bind:bg-image-active="waveform.knob.img.active"
                v-bind:bg-image-inactive="waveform.knob.img.inactive"
                v-bind:waveform="waveform.name"
                v-bind:color="waveform.knob.color"
                v-bind:title="`toggle ${ waveform.name } level on / off.`"
                diameter="25%">
                </knob>
            </div>

            <div class="waveform-level-container">
                <slider 
                v-for="waveform in ui.waveforms" 
                v-on:slide="adjustOscillatorVolume"
                v-bind:control-source="soundEngine.settings.oscillators[ waveform.name ]"
                v-bind:direction="waveform.slider.direction"
                v-bind:name="waveform.name"
                v-bind:content="waveform.name"
                v-bind:title="`adjust ${ waveform.name }wave volume.`"
                v-bind:color="waveform.slider.color">
                </slider>
            </div>

        </div>

        <!-- Envelope -->
        <div class="module envelope-container">

            <div 
                v-for="param in ui.envelope"
                class="envelope-slider-container">

                <h1 
                v-bind:title="param.name"
                class="envelope-slider-label">{{ param.name | abbreviate }}</h1>

                <slider 
                v-on:slide="setEnvelopeValue"
                v-bind:control-source="soundEngine.settings.envelope[ param.name ]"
                v-bind:direction="param.slider.direction"
                v-bind:opacity="0.4"
                v-bind:name="param.name"
                v-bind:content="param.name"
                v-bind:color="param.slider.color"
                v-bind:title="param.slider.description">
                </slider>
            </div>

        </div>

        <!-- Expression Wheels Container -->
        <div class="module wheels-container">

            <div class="expression-wheel-container">
                <slider
                v-on:slide="adjustModWheel"
                v-bind:sticky="true"
                v-bind:control-source="soundEngine.settings.expression.modulation"
                v-bind:direction="ui.expression.modulation.slider.direction"
                v-bind:opacity="1"
                v-bind:name="ui.expression.modulation.name"
                v-bind:content="ui.expression.modulation.name"
                v-bind:color="ui.expression.modulation.slider.color"
                v-bind:title="ui.expression.modulation.name">
                </slider>
            </div>

            <div class="modulation-wheel-container">
                <slider
                v-on:slide="adjustModWheel"
                v-bind:sticky="true"
                v-bind:control-source="soundEngine.settings.expression.modulation"
                v-bind:direction="ui.expression.modulation.slider.direction"
                v-bind:opacity="1"
                v-bind:name="ui.expression.modulation.name"
                v-bind:content="ui.expression.modulation.name"
                v-bind:color="ui.expression.modulation.slider.color"
                v-bind:title="ui.expression.modulation.name">
                </slider>
            </div>

        </div>

        <!-- Preset Settings -->
        <div class="module selector-container">
            <preset-manager 
            v-on:NEW_PRESET="newPreset"
            v-on:CHANGE_PRESET="changePreset"
            v-on:UPDATE_PRESET="updatePreset"
            v-bind:preset-data="localStorage.config">
            </preset-manager>
        </div>

        <!-- Signature Sign Container -->
        <div class="module title-container">
            <h1 class="make">ARS</h1>
            <h1 class="model">1</h1>
        </div>

        <!-- Signature Sign Container -->
        <div class="module transport-controls">

            <button 
            v-on:click="toggleRecord"
            class="record-button">
                RECORD
            </button>

            <button 
            v-on:click="stop"
            class="stop-button">
                STOP
            </button>

            <button 
            v-on:click="play"
            class="play-button">
                PLAY
            </button>
        </div>

        <!-- Keyboard Container -->
        <div class="module keyboard-container">
            <div class="keyboard">
                <key 
                v-for="index in 25" 
                v-bind:index="index - 1" 
                v-bind:blackKeys="ui.keyboard.blackKeys"
                v-on:noteon="noteOn"
                v-on:noteoff="noteOff">
                </key>
            </div>
        </div>

    </div>
</template>

<style>

html, body, * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
html, body {
    height: 100%;
    font-family: Arial, Helvetica;
}
h1 {
    color: black;
    user-select: none;
}
.synth-container {
    height: 100%;
    width: 100%;
    font-size: 0em;
}
.synth-container > div > * {
    font-size: initial;
}
.controls-upper,
.controls-lower {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30%;
}

.module,
.master-volume-container,
.master-pitch-container,
.waveforms-and-options-container,
.filter-container,
.sequencer-container,
.wheels-container,
.envelope-container,
.sequencer-container,
.title-container,
.lfo-container,
.sequencer-container {
    min-width: calc(100% / 2);
    width: 25%;
    height: 30%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align:top;
}
.title-container {
    font-weight: 100;
    font-family: Helvetica Neue;
}
.envelope-slider-container { 
    border-right: 1px solid rgb(239,239,239);
    position: relative;
    width: 25%;
    height: 100%;
}
h1.envelope-slider-label {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
}
h1.make,
h1.model {
    margin-left: 10px;
    color: black;
    font-size: 5vw;
}
h1.model {
    margin-left: 34px;
    margin-top: -16px;
    font-size: 200px;
}
h1.make {
    font-weight: 100;
}
.wheels-container {
    background: lightgray;
    position: relative;
}
.expression-wheel-container,
.modulation-wheel-container {
    width: 50%;
    height: 100%;
    background: black;
    position: relative;
    margin: 0 20%;
}
.master-volume-container {
    background: pink;
}
.octave-button-up,
.octave-button-down {
    display: block;
    font-size: 4em;
}

.master-pitch-container {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: rgb(40,40,40);
}
.LED-container,
.volume-container {
    padding: 5%;
    height: 100%;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;

}
.octave-buttons-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    vertical-align: bottom;
    width: 50%;
    height: 100%;
}
.waveforms-and-options-container {
    background: lightgreen;
    flex-direction: column;
}
.waveforms-container,
.waveform-level-container {
    display: inline-flex;
    height: 50%;
    width: 100%;
}

.waveform-level-container {
    position: relative;
    background: whitesmoke;
}
.filter-container {
    background: #e8e8e8;
}
.envelope-container {
    background: whitesmoke;
}
.lfo-container {
    background: lightblue;
}

.transport-controls {
    .record-button {
    }
    .play-button {
    }
    .stop-button {
    }
}

.keyboard-container {
    height: 40%;
    width: 100%;
}

.keyboard {
    height: 100%;
    width: 100%;
    background: whitesmoke;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
}

.knob,
.btn {
    box-shadow: 0 2px 0px 0px #afafaf;
}

@media(max-width: 500px) {
    .LED-container {
        flex-direction: column;
    }
    .keyboard-container {
        transform: rotate(180deg);
        width: 100%;
        height: 150%;
    }
    .keyboard {
        flex-direction: column;
        height: 100%;
    }
}
</style>

<script>
    // vue components
    import FastClick from 'fastclick';

    // synth components
    import {

        Key,
        Slider,
        Knob,
        Wheel,
        Btn,
        LED,
        PresetManager

    } from '../components';

    // synth configuration
    import palette from '../services/colorPalette';
    import { synthConfig } from '../config/synth'; 
    const { ui, config } = synthConfig;

    // service classes
    import SoundEngine from '../services/SoundEngine';
    import LocalStorage from '../services/LocalStorage';

    // service objects
    const localStorage = new LocalStorage({ defaults: config });
    const soundEngine = new SoundEngine({ config: localStorage.currentPreset });

    export default {

        name: 'Synthesizer',
        data: function() {
            return {
                ui,
                palette,
                localStorage,
                soundEngine,
            };
        },
        created: function() {
            // this.soundEngine.settings = this.localStorage.config.currentPreset;
        },
        mounted: function() {
            document.addEventListener('load', () => { 
                FastClick.attach(document.body); 
            }); 
        },
        methods: {
            toggleMasterVol() {
                this.soundEngine.active = !this.soundEngine.active;
            },
            toggleOscillatorVol({ waveform }) {
                let waveForm = this.soundEngine.settings.oscillators[waveform]; 
                waveForm.active = !waveForm.active; 
            },
            adjustModWheel(direction) {
            },
            adjustOctave(direction) { 
                this.soundEngine.octave += direction;
            },
            adjustOscillatorVolume({ name, value }) {
                this.soundEngine.settings.oscillators[ name ].value = value;
            },
            setEnvelopeValue({ name, value }) {
                this.soundEngine.settings.envelope[ name ].value = value;
            },
            noteOn({ index }) {
                this.soundEngine.playNote(index);
            },
            noteOff({ index }) {
                this.soundEngine.noteOff();
            },
            updatePreset({ name }) {
                const settings = this.localStorage.data.currentPreset;
                this.localStorage.savePreset(name, settings);
            },
            changePreset({ name }) {
                this.localStorage.changePreset(name);
            },
            newPreset({ name }) {
                const settings = this.localStorage.data.currentPreset;
                this.localStorage.savePreset(name, settings); 
            },
            toggleRecord() {
                this.soundEngine.recordEnabled = !this.soundEngine.recordEnabled;
            },
            play() {
            },
            stop() {
                if (this.soundEngine.recordEnabled) {
                    this.soundEngine.recordEnabled = false;
                }
            }

        },
        watch: {
            'localStorage.data': function() {
                this.soundEngine.settings = this.localStorage.currentPreset;
            }
        },
        filters: {
            abbreviate: s => s.charAt(0).toUpperCase(),
        },
        components: { 
            Btn,
            Key, 
            Knob,
            LED,
            PresetManager,
            Slider, 
            Wheel
        }
    };

</script>
