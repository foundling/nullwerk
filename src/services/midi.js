if (typeof navigator.requestMIDIAccess === 'function') {

    navigator.requestMIDIAccess({

        sysex: false

    }).then(onSuccess, onFailure);

}

function onSuccess (midiAccess) {

    const inputs = midiAccess.inputs.values();
    for(let input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage;
    }

}

function onFailure () {
    console.log('midi fail');
}

function onMIDIMessage(message) {

    // [ command and channel, note, velocity data ]
    const data = message.data;

    const command = data[0] >> 4;
    const channel = data[0] & 0xf;
    const type = data[0] & 0xf0;
    const note = data[1];
    const velocity = data[2];


    if (note) {
        console.log(note);
    }

    switch(type) {
        case 144: // noteOn message
            noteOn(note, velocity);
            break;
        case 128: // noteOn message
            noteOff(note, velocity);
            break;
    }

}

function onMIDIFailure(err) {
    console.log(err.name);
}
