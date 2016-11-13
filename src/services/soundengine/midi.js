export default {

    init () {

        if (typeof navigator.requestMIDIAccess !== 'function') {
            return console.log(`Sorry, your browser doesn't seem to support the Web Midi Api :[ `);
        }

        // return promise
        return navigator.requestMIDIAccess({ sysex: false });

    }

}
