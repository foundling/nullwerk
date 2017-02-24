export default {

    init() {

        if (typeof navigator.requestMIDIAccess !== 'function') {
            console.log(`Sorry, your browser doesn't seem to support the Web Midi Api :[ `);
            return null;
        }

        return navigator.requestMIDIAccess({ sysex: false });

    }

}
