<template>

    <div 
    v-on:touchstart.prevent="startNote(index)"
    v-on:touchend.prevent="stopNote(index)"
    v-on:mousedown.prevent="startNote(index)"
    v-on:mouseup.prevent="stopNote(index)"
    v-bind:class="classData"
    v-bind:style="styleData"
    class="key">
    </div> 

</template>

<style lang="scss">
    .key {
        height: 100%;
        border: 1px solid rgb(40,40,40); 
    }
    div.active-key {
        background: #ff8c8c;
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
            align-self: flex-end;
        }
        .white-key {
            height: calc(100% / 15);
        }
    }
</style>

<script>
    import { getScreenWidth } from './../utils';
    import { screenWidthMixin }  from './../mixins';

    export default {
        name: 'Key',
        components: {
        },
        mixins: [ screenWidthMixin ],
        data: function() {
            return {
                // screenDimensions is a mixin object with screen height and width properties
                keyboardDirection: null,
                active: false,
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
            this.keyboardDirection = this.screenDimensions.width >= 500 ? 'horizontal' : 'vertical';
        }, 

        methods: {
            updateKeyboardDimensions() {
                this.keyboardDirection = this.screenDimensions.width >= 500 ? 'horizontal' : 'vertical';
            },
            startNote(index) {
                this.active = true;
                this.$emit('noteon', { index });
            },
            stopNote(index) {
                this.active = false;
                this.$emit('noteoff', { index }); 
            },
        }, 
        computed: {
            keyboardDirection: function() {
                return this.screenDimensions.width >= 500 ? 'horizontal' : 'vertical';
            },
            isActive: function() {
                return this.active;
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
            classData: function() { 
                return {
                    'black-key': this.isBlackKey, 
                    'white-key': !this.isBlackKey, 
                    'active-key': this.active,
                };
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
    };
</script>
