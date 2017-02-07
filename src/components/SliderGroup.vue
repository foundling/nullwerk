<template>
<!--
    v-for="waveform in waveforms" 
    v-bind:color="waveform.color"
    v-bind:direction="waveform.slider.direction"
    v-bind:waveform="waveform.name"
    v-bind:active="waveform.active"
    barHeight="100%"
    barWidth="10%"
-->
<div class="slider-container">
    <slot></slot>
</div>

</template>

<style>

    .slider-container {
        width: 100%;
        height: 100%;
        position: absolute; 
        bottom: 0px;
        left: 0px;
        opacity: 0.7;

    }
    .slider-track {

    }
    .slider-bar {
        -webkit-transform: translateX(0px);
        position: absolute;
    }

</style>

<script>
    import Vue from 'vue';
    import VueTouch from 'vue-touch';
    import store from '../store';
    import Slider from './Slider';
    import { computeWidth, log } from '../utils';

    Vue.use(VueTouch);

    export default {
        components: {
            Slider
        },
        props: {
            waveform: Object,
            waveforms: Array,
            active: Boolean,
            color: String,
            direction: {
                type: String,
                default: 'vertical',
                validator: direction => [ 'horizontal', 'vertical' ].includes(direction),
            },
            barWidth: {
                type: String,
                validator: (s) => s.endsWith('%')
            },
            barHeight: {
                type: String,
                validator: (s) => s.endsWith('%')
            }

        },
        created: function() {
            this.styleData = this.buildStyleData();
        },
        data: function() {
            return {
                styleData: null,
                initialOffset: 0,
                offset: 0
            };
        },
        computed: {
            barStyle() {
                return this.styleData.bar;
            }
        },
        methods: {

            moveSlider(e) {

                const slideBar = e.target;
                const slideTrack = e.target.parentNode;

                const slideBarWidth = computeWidth(slideBar);
                const slideTrackWidth = computeWidth(slideTrack);

                /* calculate min/max offset boundaries */
                const minLeftOffset = 0;
                const maxLeftOffset = slideTrackWidth - slideBarWidth;

                const diff = (this.initialOffset + e.deltaX) - this.initialOffset;

                /* make sure offset is a valid value */
                if (this.initialOffset + diff < minLeftOffset) {
                    this.offset = minLeftOffset;
                }
                else if (this.initialOffset + diff > maxLeftOffset) {
                    this.offset = maxLeftOffset;
                }
                else {
                    this.offset = this.initialOffset + diff;
                }
            
                /* update dom */
                slideBar.style.transform = 'translateX(' + this.offset + 'px)';

            },
            moveSliderEnd() {
                this.initialOffset = this.offset; 
            },
            buildStyleData() {

                let styleData = {
                    bar: { 
                        display: this.active ? 'initial' : 'none',
                        height: this.barHeight,
                        width: this.barWidth,
                        bottom: '0px',
                        left: '0px',
                        background: this.color
                    }
                };
                
                return styleData; 
            }
        },
        
    };
</script>
