export default class Note {

    constructor() {
        
        const AudioContext = window.AudioContext || window.webkitAudioContext; 
        const context = new AudioContext();
        const triangle = context.createOscillator();
        const square = context.createOscillator();
        const sine = context.createOscillator();
        const masterGain = context.createGain();

        triangle.frequency.value = 220;
        triangle.type = 'triangle';
        triangle.start();

        square.frequency.value = 440;
        square.type = 'square';
        square.start();

        sine.frequency.value = 440;
        sine.frequency.type = 'sine';
        sine.start();

        masterGain.gain.value = 0;

        triangle.connect(masterGain);
        square.connect(masterGain);
        masterGain.connect(context.destination);
    }

    changeFrequency() {
        [square, sine, triange].forEach(function(wave) {
            wave.frequency.value = newFrequency;

        }); 
    }
    changeVolume(){
        masterGain.gain.volume += offset;
    }

}
