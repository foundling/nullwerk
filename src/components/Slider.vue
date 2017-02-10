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
    import store from '../store';
    import { toComputedProp, log } from '../utils';

    Vue.use(VueTouch);

    export default {
        name: 'Slider',
        props: {
            level: {
                type: Number,
            },
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
                initialOffset: this.level,
                offset: 0,
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

                const dimensionType = this.direction === 'horizontal' ? 'width' : 'height'; 
                const sign = this.direction === 'horizontal' ? 1 : -1; 

                const slideBar = e.target;
                const slideBarDimension = toComputedProp(slideBar, dimensionType);

                const slideTrack = e.target.parentNode;
                const slideTrackDimension = toComputedProp(slideTrack, dimensionType);

                const delta = sign * e['delta' + this.axis];
                const diff = (this.initialOffset + delta) - this.initialOffset;

                const minOffset = 0;
                const maxOffset = (slideTrackDimension - slideBarDimension);

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

                /* update dom */
                slideBar.style.transform = `translate${ this.axis }(${ sign * this.offset }px)`;

                /* emit new value */
                this.$emit('slide', {
                    name: this.name,
                    value: this.offset / maxOffset
                });

            },
            moveSliderEnd() {
                this.initialOffset = this.offset; 
            },
            buildStyleData() {

                let styleData = {
                    bar: { 
                        display: this.controlSource.active ? 'flex' : 'none',
                        height: this.barHeight,
                        width: this.barWidth,
                        bottom: '0px',
                        left: '0px',
                        background: this.color,
                        opacity: this.opacity
                    }
                };
                
                return styleData; 
            }
        },
        
    };
</script>
