import palette from './../services/colorPalette';

export const synthConfig = {

    sound: {

        synth: {
            active: true,
            masterVolume: {
                max: 0.5,
                min: 0.0,
                value: 0.3,
                savedValue: 0.3,
            },
            octave: -1,
            oscillators: {
                square: {
                    osc: null,
                    name: 'square',
                    active: true,
                    value: 0.4,
                    savedValue: 0.0,
                    overtones: [
                        {
                            harmonic: 1, 
                            value: 1
                        },
                        {
                            harmonic: 2, 
                            value: 1
                        },
                        {
                            harmonic: 3, 
                            value: 1
                        },
                        {
                            harmonic: 4, 
                            value: 1
                        },
                        {
                            harmonic: 5, 
                            value: 1
                        },
                        {
                            harmonic: 6, 
                            value: 1
                        }
                    ]
                },
                triangle: {
                    osc: null,
                    name: 'triangle',
                    active: true,
                    value: 0.4,
                    savedValue: 0.0,
                    overtones: [
                        {
                            harmonic: 1, 
                            value: 1
                        },
                        {
                            harmonic: 2, 
                            value: 1
                        },
                        {
                            harmonic: 3, 
                            value: 1
                        },
                        {
                            harmonic: 4, 
                            value: 1
                        },
                        {
                            harmonic: 5, 
                            value: 1
                        },
                        {
                            harmonic: 6, 
                            value: 1
                        }
                    ]
                },
                sawtooth: {
                    osc: null,
                    name: 'sawtooth',
                    active: true,
                    value: 0.35,
                    savedValue: 0.0,
                    overtones: [
                        {
                            harmonic: 1, 
                            value: 1
                        },
                        {
                            harmonic: 2, 
                            value: 1
                        },
                        {
                            harmonic: 3, 
                            value: 1
                        },
                        {
                            harmonic: 4, 
                            value: 1
                        },
                        {
                            harmonic: 5, 
                            value: 1
                        },
                        {
                            harmonic: 6, 
                            value: 1
                        }
                    ]
                },
                sine: {
                    osc: null,
                    name: 'sine',
                    active: true,
                    value: 0.45,
                    savedValue: 0.0,
                    overtones: [
                        {
                            harmonic: 1, 
                            value: 1
                        },
                        {
                            harmonic: 2, 
                            value: 1
                        },
                        {
                            harmonic: 3, 
                            value: 1
                        },
                        {
                            harmonic: 4, 
                            value: 1
                        },
                        {
                            harmonic: 5, 
                            value: 1
                        },
                        {
                            harmonic: 6, 
                            value: 1
                        }
                    ]
                }
            },
            envelope: {
                attack: {
                    active: true,
                    name: 'attack',
                    value: 0,
                },
                decay: {
                    active: true,
                    name: 'decay',
                    value: 0,
                },
                sustain: {
                    active: true,
                    name: 'sustain',
                    value: 0, 
                },
                release: {
                    active: true,
                    name: 'release',
                    value: 0,
                },
            },
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
                    color: palette.black, 
                    direction: 'vertical'
                }
            },
            {
                name: 'decay',
                slider: {
                    color: palette.black, 
                    direction: 'vertical',
                }
            },
            {
                name: 'sustain',
                slider: {
                    color: palette.black, 
                    direction: 'vertical'
                }
            },
            {
                name: 'release',
                slider: {
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
