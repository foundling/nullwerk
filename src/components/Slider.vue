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
                styleData: null
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

            // good hammer slider example from here: 
            // https://blog.madewithenvy.com/build-your-own-touch-slider-with-hammerjs-af99665d2869#.v7wtv34ui

            moveSlider(e) {

                //get ref to elements
                const slideBar = e.target;
                const slideTrack = e.target.parentNode;

                // get element widths in pixels
                const slideBarWidth = computeWidth(slideBar);
                const slideTrackWidth = computeWidth(slideTrack);

                // get slideBar offset pixels
                const slideBarOffsetLeft = slideBar.offsetLeft;

                // set boundaries in pixels
                const minOffset = 0;
                const maxOffset = slideTrackWidth - slideBarWidth;

                // get current offset
                const offsetLeft = this.barStyle.transformPx + e.deltaX;

                // set barStyle.transformPx to a valid value
                if (offsetLeft < minOffset) {
                    this.barStyle.transformPx = minOffset;
                }
                else if (offsetLeft > maxOffset) {
                    this.barStyle.transformPx = maxOffset;
                }
                else {
                    this.barStyle.transformPx = offsetLeft;
                }
                //update slider el's style with value
                slideBar.style.transform = 'translateX(' + this.barStyle.transformPx + 'px)';

            },
            buildStyleData() {

                /* default is 'vertical' */
                let track = {
                    height: '100%',
                    width: this.barWidth
                }

                let bar = {
                    transformPx: 0,
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
