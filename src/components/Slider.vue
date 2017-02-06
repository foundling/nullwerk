<template>

    <div 
    class="slider-container" 
    v-bind:style="styleData">

        <div 
        v-bind:style="styleData.slot"
        class="slider-slot">

        <slot><v-touch 
            v-bind:pan-options="{ direction: direction }"
            v-on:pan="moveSlider"
            v-bind:style="barStyle"
            class="slider-bar"></v-touch></slot>

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
    .slider-slot {

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

    Vue.use(VueTouch);


    export default {
        components: {
        },
        props: {
            direction: {
                type: String,
                default: 'vertical',
                validator: function(direction) {
                    return [ 'horizontal', 'vertical' ].includes(direction);
                },
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
            }
        },
        methods: {

            // good hammer slider example from here: 
            // https://blog.madewithenvy.com/build-your-own-touch-slider-with-hammerjs-af99665d2869#.v7wtv34ui

            handleMousedown(e) {
                console.log(e);
            },
            moveSlider(e) {
                const slideBar = e.target;
                const currentOffset = slideBar.offsetLeft / e.target.parentNode.clientWidth;
                console.log('current offset:', currentOffset);

                const percentage =  Math.floor(currentOffset + ((e.deltaX  + e.target.clientWidth) / e.target.parentNode.clientWidth * 100));
                const sliderWidth = Math.floor((e.target.clientWidth / e.target.parentNode.clientWidth) * 100);

                if (percentage < 0 || percentage + sliderWidth > 100 ) return;

                this.styleData.bar.left = percentage + '%';
            },
            buildStyleData() {

                let slot = {
                    height: '100%',
                    width: this.barWidth
                }

                let bar = {
                    height: this.barHeight,
                    width: this.barWidth,
                    bottom: 0,
                    left: 0
                }
                
                if (this.direction === 'horizontal') {

                    slot.height = '100%';
                    slot.width = '100%';

                    bar.height = this.barHeight;
                    bar.width = this.barWidth;
                    bar.bottom = 0;
                    bar.left = 0;

                } else {

                    

                }

                return { slot, bar };
            }
        },
        
    };
</script>
