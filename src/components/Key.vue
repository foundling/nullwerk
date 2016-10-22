<template>
    <div class="key"></div> 
</template>

<style>
    .key {
        height: 400px;
        width: 5%;
        background: whitesmoke;
        border: 1px solid rgb(40,40,40); 
    }
    .black {
        background: rgb(40,40,40);
    }
</style>

<script>

    import SoundEngine from './SoundEngine';

    export default {
        props: ['note'],
        components:{
        },
        data: function (){
            return {

            };
        },
        computed: {
            isBlackKey: function() {
                console.log(arguments);
                return {
                    black: 'black'
                }
            }
        }, 
        methods: {
        },
    };

</script>
