<script>
    let midiDevices = [];
    // WEB MIDI
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(function (midiInterface) {

            const inputs = midiInterface.inputs.values(); 
            let input = null;
            for (input = inputs.next(); input && !input.done; input = inputs.next()) {
                console.log('device', input);
                midiDevices.push(input);
            } 
            return midiDevices;
        }).then(function(midiDevices) {
            midiDevices[1].onmidimessage = function() {
                console.log(arguments);
            };
        });
    }
</script>
