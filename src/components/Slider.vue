<template>

    <v-touch 
    v-show="controlSource.active"
    v-bind:pan-options="{ direction: direction, threshold: 0 }"
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
    import { toComputedProp, log } from '../utils';

    Vue.use(VueTouch);

    export default {
        components: {},
        props: {
            color: {
                type: String,
            },
            controlSource: {
                type: Object,
            },
            direction: {
                type: String,
                validator: (s) => ['vertical','horizontal'].includes(s)
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
            axis() {
                return this.direction === 'horizontal' ? 'X' : 'Y';
            }
        },
        methods: {

            moveSlider(e) {

                /* 

                This is due for a refactor. Notes on the somewhat confusing approach below:

                - I'm calculating the *additional* deltaX on each pan event because 
                e.deltaX is cumulative across events that make up a pan action. 
                the additional amount of each deltaX from the last reading lets me know
                how much to move the slider to the left or right.
                - I'm then using that left or right px value in a css3 translateX transform. 
                - finally, I'm updating the offset for use in the next calculation.

                */

                const slideBar = e.target;
                const slideTrack = e.target.parentNode;

                /* get correct delta property, X or Y */
                const delta = e[`delta${ this.axis }`];


                /* dimension is a generalization of Width or Height */
                const slideBarDimension = toComputedProp(slideBar, this.direction === 'vertical' ? 'height' : 'width');
                const slideTrackDimension = toComputedProp(slideTrack, this.direction === 'vertical' ? 'height' : 'width');

                /*
                console.log(this.axis);
                console.log(delta);
                console.log(slideBar);
                console.log(slideTrack);
                console.log(slideBarDimension);
                console.log(slideTrackDimension);
                */

                /* calculate min/max offset boundaries */
                const minOffset = 0;
                const maxOffset = slideTrackDimension - slideBarDimension;

                const diff = (this.initialOffset + delta) - this.initialOffset;

                /* make sure offset is a valid value */
                if (this.initialOffset + diff < minOffset) {
                    this.offset = minOffset;
                }
                else if (this.initialOffset + diff > maxOffset) {
                    this.offset = maxOffset;
                }
                else {
                    this.offset = this.initialOffset + diff;
                }
            
                /* update dom with translateX or translateY */
                slideBar.style.transform = `translate${ this.axis }(${ this.offset }px)`;

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
