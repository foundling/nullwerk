<template>

    <div 
    class="slider-container" 
    v-bind:style="styleData">

        <div 
        v-bind:style="styleData.track"
        class="slider-track">
            <slot>
                <v-touch 
                v-bind:pan-options="{ direction: direction, threshold: 0 }"
                v-on:pan="moveSlider"
                v-on:panend="moveSliderEnd"
                v-bind:style="barStyle"
                class="slider-bar"></v-touch>
            </slot>
        </div>

    </div>

</template>

<style>

    .slider-container {

        width: 100%;
        height: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: lightgray;

    }
    .slider-track {

        position: relative;
        height: 100%;
        background: black;
        border: 1px solid black;
        height: 90%;
        width: 100%;

    }
    .slider-bar {
        -webkit-transform: translateX(0px);
        position: absolute;
        background: lightgray;
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
            },
            trackStyle() {
                return this.styleData.track;
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

                /* default is 'vertical' */
                let track = {
                    height: '100%',
                    width: this.barWidth
                }

                let bar = {
                    height: this.barHeight,
                    width: this.barWidth,
                }
                
                if (this.direction === 'horizontal') {

                    track.height = '100%';
                    track.width = '100%';

                    bar.height = this.barHeight;
                    bar.width = this.barWidth;
                    bar.transformPx = 0;
                    bar.bottom = 0;
                    bar.left = 0;

                } 

                return { track, bar };
            }
        },
        
    };
</script>
