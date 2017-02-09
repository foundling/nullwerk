<template>

    <div 
        v-on:widthchange="console.log('hi')"
        v-on:mousedown="startNote(index)"
        v-on:mouseup="stopNote(index)"
        v-bind:class="{ 'black-key': isBlackKey, 'white-key': !isBlackKey }"
        v-bind:style="styleData"
        class="key">
    </div> 

</template>

<style lang="scss">

    .key {
        height: 100%;
        border: 1px solid rgb(40,40,40); 
    }
    .black-key {
        position: absolute;
        top: 0px;
        width: calc(100% / 30);
        height: 65%;
        background: rgb(40,40,40);
    }
    .white-key {
        width: 8%;
        width: calc(100% / 15);
        background: whitesmoke;
    }
    @media(max-width: 500px) {
        .key {
            width: 100%; 
        }
        .black-key {
            height: calc(100% / 30);
            width: 65%;
            align-self: flex-start;
        }
        .white-key {
            height: calc(100% / 15);
        }
    }
</style>

<script>
    import store from '../store';
    import { getScreenWidth } from './../utils';

    export default {
        data: function() {
            return {
                screenWidth: null,
                keyboardDirection: null,
                keyWidthPercent: {
                    white: 100/15,
                    black: (100/15) / 2
                }
            };
        },
        props: [
            'index', 
            'blackKeys'
        ],
        created: function() {
            const that = this;
            window.addEventListener('resize', function() { 
                const newWidth = getScreenWidth();
                that.screenWidth = newWidth;
                that.keyboardDirection = newWidth >= 500 ? 'horizontal' : 'vertical';
            }); 
        }, 
        onDestroy: function() {
            window.removeEventListener('resize', this.handleResize);
        },
        computed: {
            computedKeyboardDirection() {
            },
            computedScreenSize() {
            },
            isBlackKey: function() {
                return this.blackKeys.includes(this.index);
            },
            offset: function() {
                let whiteKeysToTheLeft = [ ...Array(this.index).keys() ]
                    .filter(keyIndex => !this.blackKeys.includes(keyIndex))
                    .length;

                let offset = whiteKeysToTheLeft * this.keyWidthPercent.white - (this.keyWidthPercent.black / 2) ; 
                return offset + '%';
            },
            styleData: function() {

                let styleObj = {};
                if (!this.isBlackKey) return styleObj;

                if (this.keyboardDirection === 'horizontal') {
                    styleObj.top = null;
                    styleObj.left = this.offset;
                }
                if (this.keyboardDirection === 'vertical') {
                    styleObj.top = this.offset;
                    styleObj.left = null;
                }
                return styleObj;
            }
        }, 
        methods: {
            startNote(index) {
                this.$store.state.soundEngine.playNote(index)
            },
            stopNote() {
                this.$store.state.soundEngine.muteNote()
            },
            handleResize() {
                this.screenWidth = getScreenWidth();
                console.log(this.screenWidth);
            }
        }, 
    };
</script>
