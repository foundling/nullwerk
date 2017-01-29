<template>

    <div 
        v-on:mousedown="startNote(index)"
        v-on:mouseup="stopNote(index)"
        v-bind:class="{ 'black-key': isBlackKey, 'white-key': !isBlackKey }"
        v-bind:style="{ left: isBlackKey ? offset : null}"
        class="key">
    </div> 

</template>

<style>
    .key {
        height: 400px;
        border: 1px solid rgb(40,40,40); 
    }
    .black-key {
        position: absolute;
        top: 0px;
        width: calc(100% / 30);
        height: 50%;
        background: rgb(40,40,40);
    }
    .white-key {
        width: 8%;
        width: calc(100% / 15);
        background: whitesmoke;
    }
</style>

<script>
    import store from '../store';

    export default {
        data: function() {
            /*
             blackKeys: [
                    1, 3, 
                    6, 8, 10,
                    13,15,
                    18, 20, 22,
                ]
                */
                return {
                    keyWidthPercent: {
                        white: 100/15,
                        black: (100/15) / 2
                    }
                };

        },
        props: ['index', 'blackKeys'],
        computed: {
            isBlackKey: function() {
                return this.blackKeys.includes(this.index);
                console.log(this);
            },
            offset: function() {
                let whiteKeysToTheLeft = [ ...Array(this.index).keys() ]
                    .filter(keyIndex => !this.blackKeys.includes(keyIndex))
                    .length;

                let offset = whiteKeysToTheLeft * this.keyWidthPercent.white - (this.keyWidthPercent.black / 2) ; 
                console.log(this.index, whiteKeysToTheLeft, offset + '%');
                return offset + '%';
            }
        }, 
        methods: {
            startNote(index) {
                this.$store.state.soundEngine.playNote(index)
            },
            stopNote() {
                this.$store.state.soundEngine.muteNote()
            },
        }, 
    };
</script>
