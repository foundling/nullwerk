import palette from './../services/colorPalette';

export const synthConfig = {

    sound: {

        synth: {
            active: true,
            masterVolume: {
                max: 0.5,
                min: 0.0,
                level: 0.0,
                previousLevel: null,
            },
            octave: -1,
            oscillators: {
                square: {
                    osc: null,
                    name: 'square',
                    active: true,
                    level: 0.1,
                    savedLevel: 0.0,
                    overtones: [
                        {
                            harmonic: 1, 
                            level: 1
                        },
                        {
                            harmonic: 2, 
                            level: 1
                        },
                        {
                            harmonic: 3, 
                            level: 1
                        },
                        {
                            harmonic: 4, 
                            level: 1
                        },
                        {
                            harmonic: 5, 
                            level: 1
                        },
                        {
                            harmonic: 6, 
                            level: 1
                        }
                    ]
                },
                triangle: {
                    osc: null,
                    name: 'triangle',
                    active: true,
                    level: 0.2,
                    savedLevel: 0.0,
                    overtones: [
                        {
                            harmonic: 1, 
                            level: 1
                        },
                        {
                            harmonic: 2, 
                            level: 1
                        },
                        {
                            harmonic: 3, 
                            level: 1
                        },
                        {
                            harmonic: 4, 
                            level: 1
                        },
                        {
                            harmonic: 5, 
                            level: 1
                        },
                        {
                            harmonic: 6, 
                            level: 1
                        }
                    ]
                },
                sawtooth: {
                    osc: null,
                    name: 'sawtooth',
                    active: true,
                    level: 0.15,
                    savedLevel: 0.0,
                    overtones: [
                        {
                            harmonic: 1, 
                            level: 1
                        },
                        {
                            harmonic: 2, 
                            level: 1
                        },
                        {
                            harmonic: 3, 
                            level: 1
                        },
                        {
                            harmonic: 4, 
                            level: 1
                        },
                        {
                            harmonic: 5, 
                            level: 1
                        },
                        {
                            harmonic: 6, 
                            level: 1
                        }
                    ]
                },
                sine: {
                    osc: null,
                    name: 'sine',
                    active: true,
                    level: 0.25,
                    savedLevel: 0.0,
                    overtones: [
                        {
                            harmonic: 1, 
                            level: 1
                        },
                        {
                            harmonic: 2, 
                            level: 1
                        },
                        {
                            harmonic: 3, 
                            level: 1
                        },
                        {
                            harmonic: 4, 
                            level: 1
                        },
                        {
                            harmonic: 5, 
                            level: 1
                        },
                        {
                            harmonic: 6, 
                            level: 1
                        }
                    ]
                }
            },
            envelope: {
                attack: {
                    name: 'attack',
                    time: 0,
                },
                decay: {
                    name: 'decay',
                    time: 0,
                },
                sustain: {
                    name: 'sustain',
                    time: 0, 
                },
                release: {
                    name: 'release',
                    time: 0,
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
                    direction: 'horizontal',
                    color: 'deepskyblue',
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
