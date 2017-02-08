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
            controlSource: {
                type: Object,
            },
            direction: {
                type: String,
                validator: (s) => ['horizontal','vertical'].includes(s) 
            },
            color: { 
                type: String,
            },
            barHeight: {
                type: String,
                validator: (s) => s.endsWith('%')
            },
            barWidth: {
                type: String,
                validator: (s) => s.endsWith('%')
            },
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
                Notes on the approach below:
                1. 

                */
                const dimensionType = this.direction === 'horizontal' ? 'width' : 'height'; 
                const sign = this.direction === 'horizontal' ? 1 : -1; 
                const delta = sign * e['delta' + this.axis];

                const slideBar = e.target;
                const slideTrack = e.target.parentNode;

                const slideBarDimension = toComputedProp(slideBar, dimensionType);
                const slideTrackDimension = toComputedProp(slideTrack, dimensionType);

                /* calculate min/max offset boundaries */


                const diff = (this.initialOffset + delta) - this.initialOffset;

                if (this.axis === 'X') {

                    const minOffset = 0;
                    const maxOffset = (slideTrackDimension - slideBarDimension);
                    console.log('offset: ', this.offset);
                    console.log('minoffset:', minOffset);
                    console.log('maxoffset:', maxOffset);
                    console.log('');

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
                    slideBar.style.transform = `translate${ this.axis }(${ this.offset }px)`;

                } else {
                    
                    const minOffset = 0;
                    const maxOffset = (slideTrackDimension - slideBarDimension);
                    console.log('delta: ', delta);
                    console.log('offset: ', this.offset);
                    console.log('minoffset:', minOffset);
                    console.log('maxoffset:', maxOffset);
                    console.log('');
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

                    slideBar.style.transform = `translate${ this.axis }(${ sign * this.offset }px)`;
                }
                               /* update dom */

            },
            moveSliderEnd() {
                this.initialOffset = this.offset; 
            },
            buildStyleData() {

                let styleData = {
                    bar: { 
                        display: this.controlSource.active ? 'initial' : 'none',
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
