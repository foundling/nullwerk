<template>

    <v-touch 
    v-show="waveform.active"
    v-bind:pan-options="{ direction: waveform.slider.direction, threshold: 0 }"
    v-on:pan="moveSlider"
    v-on:panend="moveSliderEnd"
    v-bind:style="barStyle"
    class="slider-bar">
    </v-touch>

</template>

<style>

    .slider-track {
        width: 100%;
        height: 100%;
        position: absolute; 
        bottom: 0px;
        left: 0px;
        opacity: 0.7;
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
    import { computeWidth, log } from '../utils';

    Vue.use(VueTouch);

    export default {
        components: {},
        props: {
            waveform: {
                type: Object,
            },
            barHeight: {
                type: String,
                validator: (s) => s.endsWith('%')
            },
            barWidth: {
                type: String,
                validator: (s) => s.endsWith('%')
            }
        },
        created: function() {
            console.log(this);
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

                // couldn't the initial offset go away, and just 
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
                        display: this.waveform.active ? 'initial' : 'none',
                        height: this.barHeight,
                        width: this.barWidth,
                        bottom: '0px',
                        left: '0px',
                        background: this.waveform.color
                    }
                };
                
                return styleData; 
            }
        },
        
    };
</script>
