export default class Note {

    constructor() {
        
        const AudioContext = window.AudioContext || window.webkitAudioContext; 
        const context = new AudioContext();
        const defaultVolume = 0.1;
        const masterGain = context.createGain();

        const waveformTypes = [
            'sawtooth',
            'sine', 
            'square', 
            'triangle'
        ];

        const nameToOscillator = (o, waveformType) => {
            o[waveformType] = context.createOscillator();
            o[waveformType]['type'] = waveformType;
            o[waveformType]['frequency']['value'] = 440;
            return o;
        };
        const nameToGainNode = (o, waveformType) => {
            o[waveformType] = context.createGain();
            o[waveformType]['gain']['level'] = defaultVolume;
            return o;
        };
        const connectOscToItsGainNode = (oscName)  => {
            oscillators[oscName].connect(oscGainNodes[oscName]);
        };
        const connectToMasterGain = (gainNodeName) => {
            oscGainNodes[gainNodeName].connect(masterGain);
        };
        const startOscillator = (oscName)  => {
            oscillators[oscName].start();
        };

        const oscillators = waveformTypes.reduce(nameToOscillator, {});
        const oscGainNodes = waveformTypes.reduce(nameToGainNode, {});
        Object.keys(oscillators).forEach(startOscillator);
        Object.keys(oscillators).forEach(connectOscToItsGainNode);
        Object.keys(oscGainNodes).forEach(connectToMasterGain);

        masterGain.connect(context.destination);
        masterGain.gain.value = 0.1;

    }

    changeFrequency(oscName) {
        [square, sine, triange].forEach(function(wave) {
            wave.frequency.value = newFrequency;

        }); 
    }
    changeVolume(){
        masterGain.gain.volume += offset;
    }

}
