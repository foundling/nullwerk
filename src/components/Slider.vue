<template>

    <v-touch 
    v-show="controlSource.active"
    v-bind:pan-options="{ direction: direction, threshold: 0 }"
    v-on:panstart="moveSliderStart"
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

            console.log('mounted');
            const container = this.$el.parentNode;
            let offset;

            if (this.direction === 'horizontal') {

                let containerWidth = toComputedProp(container, 'width');
                offset = this.controlSource.value * containerWidth;
                this.styleData.bar.left = Math.floor(offset) + 'px';
                this.styleData.bar.bottom = '0px';
                this.offset = offset;

            } else {

                let containerHeight = toComputedProp(container, 'height');
                offset = this.controlSource.value * containerHeight;
                this.styleData.bar.left = '0px';
                this.styleData.bar.bottom = offset + 'px';

            }
            console.log(this.barStyle);

        },
        created: function() {
            console.log('created');
            this.styleData = this.buildStyleData();
            console.log(this.styleData);
        },
        data: function() {
            return {
                styleData: null,
                lastDelta: null,
                offset: null 
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

            moveSliderStart(e) {
                const slideBar = e.target;
                this.offset = toComputedProp(slideBar, 'left');
                this.lastDelta = 0;
            },
            moveSlider(e) {

                // plan: 

                //  on pan start:
                //      set last bar offset to bar left px value
                //
                //  on each 'pan' event, calculate relative delta given total offset as e.delta 
                //      incrementalDelta = delta - last offset 
                //      update offset by incremental delta but make sure value is between min and max offsets;
                //      
                //     
                //  on pan end, update the bar's left value to offset 

                const dimensionType = this.direction === 'horizontal' ? 'width' : 'height'; 
                const delta = e['delta' + this.axis];
                const sign = this.direction === 'horizontal' ? 1 : -1; 

                const slideBar = e.target;
                const slideBarDimension = toComputedProp(slideBar, dimensionType);

                const slideTrack = slideBar.parentNode;
                const slideTrackDimension = toComputedProp(slideTrack, dimensionType);

                const minOffset = 0;
                const maxOffset = slideTrackDimension - slideBarDimension;

                // calculate delta
                const incrementalDelta = delta - this.lastDelta;


                // update dom
                slideBar.style.transform = `translate${ this.axis }(${ incrementalDelta }px)`;

                // emit new value

                // calculate offset for later volume percentage calc
                this.offset = this.offset + incrementalDelta;

                //update lastDelta
                this.lastDelta = incrementalDelta;

            },
            start() {

                this.$emit('slide', {
                    name: this.name,
                    value: this.offset / maxOffset
                });
            },
            moveSliderEnd() {
                this.styleData.bar.left = this.offset + 'px';
            },
            save() {
            },
            buildStyleData() {

                let styleData = {
                    bar: { 
                        display: this.controlSource.active ? 'flex' : 'none',
                        height: this.direction === 'horizontal' ? '100%' : '10%',
                        width: this.direction === 'horizontal' ? '10%' : '100%',
                        background: this.color,
                        opacity: this.opacity
                    }
                };
                
                return styleData; 
            }
        },
        
    };
</script>
