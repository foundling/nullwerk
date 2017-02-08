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
    envelope: {
        sliders: [
            
        ]
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
    },
    waveforms: [
        {
            name: 'square',
            active: true,
            color: 'crimson',
            img: {
                inactive: '/static/img/square_wave.png',
                active: '/static/img/square_wave_inverse.png'
            },
            slider: {
                direction: 'horizontal',
                level: 0

            }
        },
        {
            name: 'triangle',
            active: true,
            color: 'darkcyan',
            img: {
                inactive: '/static/img/triangle_wave.png',
                active: '/static/img/triangle_wave_inverse.png'
            },
            slider: {
                direction: 'horizontal',
                level: 0
            }
        },
        {
            name: 'sawtooth',
            active: true,
            color: 'goldenrod',
            img: {
                inactive: '/static/img/sawtooth_wave.png',
                active: '/static/img/sawtooth_wave_inverse.png'
            },
            slider: {
                direction: 'horizontal',
                level: 0,
            }
        },
        {
            name: 'sine',
            active: true,
            color: 'deepskyblue',
            img: {
                inactive: '/static/img/sine_wave.png',
                active: '/static/img/sine_wave_inverse.png'
            },
            slider: {
                direction: 'horizontal',
                level: 0
            }
        }
    ]
};

