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
    import { toComputed, log } from '../utils';

    Vue.use(VueTouch);

    export default {
        name: 'Slider',
        data: function() {
            return {
                styleData: null,
                slideData: {
                    initialOffset: null,
                    relativeOffset: null,
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
            // fired before 'mounted'
            this.styleData = this.buildStyleData();
        },
        mounted: function() {

            // fires after 'created'
            // INITIALIZE SLIDER POSITION BASED ON CONTROL-SOURCE VALUE (percentage)

            let widthOrHeight = this.direction === 'horizontal' ? 'width' : 'height'; 
            let bar = this.$el;
            let container = bar.parentNode;
            let barDimension = toComputed(bar, widthOrHeight);
            let containerDimension = toComputed(container, widthOrHeight);
            let slideableDistancePx = containerDimension - barDimension;
            let percentOffset = this.controlSource.value;
            let sliderOffset = percentOffset * slideableDistancePx;

            this.slideData.initialOffset = sliderOffset;
            this.slideData.relativeOffset = sliderOffset;

            if (this.direction === 'horizontal') {
                this.styleData.bar.left = sliderOffset + 'px';
                this.styleData.bar.bottom = '0px';
            } else {
                this.styleData.bar.left = '0px';
                this.styleData.bar.bottom = sliderOffset;
            }

        },
        methods: {

            moveSlider(e) {
                const dimensionType = this.direction === 'horizontal' ? 'width' : 'height'; 
                const sign = this.direction === 'horizontal' ? 1 : -1; 

                const slideBar = e.target;
                const slideBarDimension = toComputed(slideBar, dimensionType);

                const slideTrack = e.target.parentNode;
                const slideTrackDimension = toComputed(slideTrack, dimensionType);

                const delta = sign * e['delta' + this.axis];
                const diff = (this.slideData.initialOffset + delta) - this.slideData.initialOffset;

                const minOffset = 0;
                const maxOffset = slideTrackDimension - slideBarDimension;

                /* set relative offset but make sure its in range */
                if (this.slideData.initialOffset + diff < minOffset) {
                    this.slideData.relativeOffset = minOffset;
                }
                else if (this.slideData.initialOffset + diff > maxOffset) {
                    this.slideData.relativeOffset = maxOffset;
                }
                else {
                    //this.slideData.relativeOffset = this.slideData.initialOffset + diff;
                    this.slideData.relativeOffset = diff;
                }

                /* update dom */
                slideBar.style.transform = `translate${ this.axis }(${ sign * this.slideData.relativeOffset }px)`;

                /* emit new value */
                this.$emit('slide', {
                    name: this.name,
                    value: this.slideData.relativeOffset / maxOffset
                });

            },
            moveSliderEnd(e) {
                this.initialOffset = this.relativeOffset;
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
