import palette from './colorPalette';

export default {

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

};
