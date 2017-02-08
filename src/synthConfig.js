import palette from './services/colorPalette';

export default {

    masterVolume: {
        active: true,
        level: 0,
        previousLevel: null
    },
    palette,
    leds: [
        { color: palette.red, octave: 2 },
        { color: palette.yellow, octave: 1 },
        { color: palette.lime, octave: 0 },
        { color: palette.yellow, octave: -1 },
        { color: palette.red, octave: -2 },
    ],
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
    },
    waveforms: [
        {
            name: 'square',
            color: 'crimson',
            img: {
                inactive: '/static/img/square_wave.png',
                active: '/static/img/square_wave_inverse.png'
            },
            slider: {
                active: true,
                direction: 'horizontal',
                level: 0

            }
        },
        {
            name: 'triangle',
            color: 'darkcyan',
            img: {
                inactive: '/static/img/triangle_wave.png',
                active: '/static/img/triangle_wave_inverse.png'
            },
            slider: {
                active: true,
                direction: 'horizontal',
                level: 0
            }
        },
        {
            name: 'sawtooth',
            color: 'goldenrod',
            img: {
                inactive: '/static/img/sawtooth_wave.png',
                active: '/static/img/sawtooth_wave_inverse.png'
            },
            slider: {
                active: true,
                direction: 'horizontal',
                level: 0,
            }
        },
        {
            name: 'sine',
            color: 'deepskyblue',
            img: {
                inactive: '/static/img/sine_wave.png',
                active: '/static/img/sine_wave_inverse.png'
            },
            slider: {
                active: true,
                direction: 'horizontal',
                level: 0
            }
        }
    ],
    envelopeFilters: [

        {
            name: 'attack',
            direction: 'vertical',
            level: 0,
            color: palette.black, 
            slider: {
                active: true,
                level: 0,
                direction: 'vertical'
            }
        },
        {
            name: 'decay',
            direction: 'vertical',
            level: 0,
            color: palette.black, 
            slider: {
                active: true,
                level: 0,
                direction: 'vertical'
            }
        },
        {
            name: 'sustain',
            direction: 'vertical',
            level: 0,
            color: palette.black, 
            slider: {
                active: true,
                level: 0,
                direction: 'vertical'
            }
        },
        {
            name: 'release',
            direction: 'vertical',
            level: 0,
            color: palette.black, 
            slider: {
                active: true,
                level: 0,
                direction: 'vertical'
            }
        },
    ]
};

