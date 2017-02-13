<template>

    <v-touch 
    v-show="controlSource.active"
    v-bind:pan-options="{ direction: direction, threshold: 0 }"
    v-on:pan="moveSlider"
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
        display: flex;
        align-content: center;
        justify-items: center;
    }
    .slider-label {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        font-weight: 100;
    }
</style>

<script>

    import Vue from 'vue';
    import VueTouch from 'vue-touch';
    import { toComputedProp, log } from '../utils';

    Vue.use(VueTouch);

    export default {
        name: 'Slider',
        props: {
            name: {
                type: String,
            },
            opacity: {
                type: Number,
                default: 1,
            },
            content: {
                type: String,
            },
            controlSource: {
                type: Object,
                validator: function(o) {
                    return o.hasOwnProperty('value') &&
                           o.hasOwnProperty('name') && 
                           o.hasOwnProperty('active');
                }
            },
            direction: {
                type: String,
                validator: (s) => ['horizontal', 'vertical'].includes(s) 
            },
            color: { 
                type: String,
            }
        },
        mounted: function() {


            if (this.dimension === 'horizontal') {
                let containerDimension = toComputedProp(this.$el.parentNode, 'width');
                let barDimension = toComputedProp(this.$el, 'width');
                this.offset = Math.floor(this.controlSource.value * (containerDimension - barDimension));
                this.lastDelta = this.offset;

                Vue.nextTick(() => {
                    this.styleData.bar.left = this.offset + 'px';
                });

            } else {

                let containerDimension = toComputedProp(this.$el.parentNode, 'height');
                let barDimension = toComputedProp(this.$el, 'height');
                this.offset = Math.floor(this.controlSource.value * (containerDimension - barDimension));
                this.lastDelta = this.offset;

                Vue.nextTick(() => {
                    this.styleData.bar.bottom = this.offset + 'px';
                });
            }

        },
        created: function() {
            this.styleData = this.buildStyleData();
        },
        data: function() {
            return {
                styleData: null,
                offset: null,
                lastDelta: null,
            };
        },
        computed: {
            abbreviatedLabel() {
                return this.content.charAt(0).toUpperCase();
            },
            barStyle() {
                return this.styleData.bar;
            },
            axis() {
                return this.direction === 'horizontal' ? 'X' : 'Y';
            }
        },
        methods: {

            moveSlider(e) {

                // set up variables for calculation
                const dimensionType = this.direction === 'horizontal' ? 'width' : 'height'; 
                const delta = e['delta' + this.axis];
                const sign = this.direction === 'horizontal' ? 1 : -1; 

                const slideBar = e.target;
                const slideBarDimension = toComputedProp(slideBar, dimensionType);

                const slideTrack = slideBar.parentNode;
                const slideTrackDimension = toComputedProp(slideTrack, dimensionType);


                const incrementalDelta = (this.lastDelta + e['delta' + this.axis]) - this.lastDelta; 

                const minOffset = 0;
                const maxOffset = slideTrackDimension - slideBarDimension;

                this.styleData.bar.transform = `translate${ this.axis }(${ incrementalDelta }px)`;

                this.lastDelta = incrementalDelta;
            },
            moveSliderEnd(e) {
            
            },
            buildStyleData() {

                let styleData = {
                    bar: { 
                        display: this.controlSource.active ? 'flex' : 'none',
                        height: this.direction === 'horizontal' ? '100%' : '10%',
                        width: this.direction === 'horizontal' ? '10%' : '100%',
                        background: this.color,
                        opacity: this.opacity,
                        left: '0px',
                        bottom: '0px',
                        transform: 'none'

                    }
                };
                
                return styleData; 
            }
        },
        
    };
</script>
