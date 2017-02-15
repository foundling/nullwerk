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
        display: flex;
        align-content: center;
        justify-content: center;
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
    import { toComputed, log } from '../utils';

    Vue.use(VueTouch);

    export default {
        name: 'Slider',
        data: function() {
            return {
                styleData: null,
                slideData: {
                    position: null,
                    lastDelta: 0
                },
            };
        },
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
        created: function() {

            // fires before 'mounted'

            this.styleData = this.buildStyleData();
        },
        mounted: function() {

            // fires after 'created'

            this.initSliderPosition();

        },
        methods: {

            initSliderPosition() {

                let dimensionType = this.direction === 'horizontal' ? 'width' : 'height'; 
                let sign = this.direction === 'horizontal' ? 1 : -1;
                let slideBar = this.$el;
                let track = slideBar.parentNode;
                let slideBarDimension = toComputed(slideBar, dimensionType);
                let trackDimension = toComputed(track, dimensionType);
                let slideableDistancePx = trackDimension - slideBarDimension;
                let percentOffset = this.controlSource.value;
                let slideBarOffset = percentOffset * slideableDistancePx;

                //this.slideData.position = slideBarOffset;
                this.slideData.position = slideBarOffset;
                this.styleData.bar.transform = `translate${ this.axis }(${ sign * slideBarOffset }px)`;

            },
            updateControlSourceValue() {

                const dimensionType = this.direction === 'horizontal' ? 'width' : 'height'; 
                const slideBar = this.$el;
                const track = slideBar.parentNode;
                const slideBarDimension = toComputed(slideBar, dimensionType);
                const trackDimension = toComputed(track, dimensionType);
                const slideableDistancePx = trackDimension - slideBarDimension;
                const newControlSourceValue = this.slideData.position / slideableDistancePx; 

                this.$emit('slide', {
                    name: this.controlSource.name,
                    value: newControlSourceValue
                });

            },
            moveSlider(e) {

                // calculate new position of slider based on incremental delta
                const dimensionType = this.direction === 'horizontal' ? 'width' : 'height'; 
                const sign = this.direction === 'horizontal' ? 1 : -1; 

                const slideBar = e.target;
                const slideBarDimension = toComputed(slideBar, dimensionType);

                const slideTrack = e.target.parentNode;
                const slideTrackDimension = toComputed(slideTrack, dimensionType);

                const minOffset = 0;
                const maxOffset = slideTrackDimension - slideBarDimension;

                let delta = sign * e['delta' + this.axis];
                let incrementalDelta = delta - this.slideData.lastDelta; 
                let newPosition = this.slideData.position + incrementalDelta; 

                // update slide position data, keeping it in range.
                if (newPosition > maxOffset) {

                    this.slideData.position = maxOffset;

                } else if (newPosition < minOffset) {

                    this.slideData.position = minOffset;

                } else {

                    this.slideData.position = newPosition;

                }

                // set translateX pixel value to new slider position
                this.styleData.bar.transform = `translate${ this.axis }(${ sign * this.slideData.position }px)`;

                // update lastDelta
                this.slideData.lastDelta = delta;
                this.updateControlSourceValue();

            },
            moveSliderEnd(e) {
                // reset lastDelta to 0 at end of gesture.
                this.slideData.lastDelta = 0;
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
        computed: {
            sliderPosition() {
                return `translate${ this.axis }(${ this.slideData.position }px)`;
            },
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
        
    };
</script>
