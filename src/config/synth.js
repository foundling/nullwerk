import palette from './../services/colorPalette';

export const synthConfig = {

    synth: {
        active: true,
        currentPreset: 'default',
        presets: {
            default: {
                masterVolume: {
                    max: 0.5,
                    min: 0.0,
                    value: 0.3,
                },
                octave: -1,
                oscillators: {
                    square: {
                        name: 'square',
                        active: true,
                        value: 0.4,
                    },
                    triangle: {
                        name: 'triangle',
                        active: true,
                        value: 0.4,
                    },
                    sawtooth: {
                        name: 'sawtooth',
                        active: true,
                        value: 0.35,
                    },
                    sine: {
                        name: 'sine',
                        active: true,
                        value: 0.80,
                    }
                },
                envelope: {
                    attack: {
                        name: 'attack',
                        value: 0.2,
                        active: true,
                    },
                    decay: {
                        name: 'decay',
                        value: 0.4,
                        active: true,
                    },
                    sustain: {
                        name: 'sustain',
                        value: 0.8, 
                        active: true,
                    },
                    release: {
                        name: 'release',
                        value: 0.7,
                        active: true,
                    },
                },
            }
        }
    },
    ui: {
        waveforms: [
            {
                name: 'square',
                knob: {
                    color: 'crimson',
                    img: {
                        inactive: '/static/img/square_wave.png',
                        active: '/static/img/square_wave_inverse.png'
                    },
                },
                slider: {
                    color: 'crimson',
                    direction: 'horizontal',
                }
            },
            {
                name: 'triangle',
                knob: {
                    color: 'darkcyan',
                    img: {
                        inactive: '/static/img/triangle_wave.png',
                        active: '/static/img/triangle_wave_inverse.png'
                    },
                },
                slider: {
                    color: 'darkcyan',
                    direction: 'horizontal',
                }
            },
            {
                name: 'sawtooth',
                knob: {
                    color: 'goldenrod',
                    img: {
                        inactive: '/static/img/sawtooth_wave.png',
                        active: '/static/img/sawtooth_wave_inverse.png'
                    },
                }, 
                slider: {
                    color: 'goldenrod',
                    direction: 'horizontal',
                }
            },
            {
                name: 'sine',
                knob: {
                    color: 'deepskyblue',
                    img: {
                        inactive: '/static/img/sine_wave.png',
                        active: '/static/img/sine_wave_inverse.png'
                    }
                },
                slider: {
                    color: 'deepskyblue',
                    direction: 'horizontal',
                }
            }
        ],
        envelope: [
            {
                name: 'attack',
                slider: {
                    description: 'adjust time to attack.',
                    color: palette.black, 
                    direction: 'vertical'
                }
            },
            {
                name: 'decay',
                slider: {
                    description: 'Adjust time taken to decay to sustain level.',
                    color: palette.black, 
                    direction: 'vertical',
                }
            },
            {
                name: 'sustain',
                slider: {
                    description: 'adjust sustain level.',
                    color: palette.black, 
                    direction: 'vertical'
                }
            },
            {
                name: 'release',
                slider: {
                    description: 'adjust time for sound to dissipate after releasing a key.',
                    color: palette.black, 
                    direction: 'vertical'
                }
            }
        ],
        keyboard: {
            blackKeys: [
                1, 3, 
                6, 8, 10,
                13,15,
                18, 20, 22,
            ] 
        },
        palette,
        leds: [
            { color: palette.red, octave: 2 },
            { color: palette.yellow, octave: 1 },
            { color: palette.lime, octave: 0 },
            { color: palette.yellow, octave: -1 },
            { color: palette.red, octave: -2 },
        ],
    },
    sequencer: {
        currentMode: 'stop',
        modes: [
            'stop', 
            'play', 
            'pause', 
            'record'
        ],
        menu: [
            'contribute',
            'faq',
            'issues'
        ],
        // # of buttons will be dynamic 
        buttons: [ ...Array(16).keys() ].map(key => {
            return {
                backgroundColor: palette.cyan,
                label: {
                    content: parseInt(key) + 1,
                    color: palette.white,
                }
            };
        })
    }
};
