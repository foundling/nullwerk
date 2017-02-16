import { getScreenWidth, getScreenHeight } from './utils'; 

const screenWidthMixin =  {

    data: function()  {
        return {
            screenDimensions: null,
        }
    },
    methods: {
        updateScreenDimensions() {
            this.screenDimensions = { width: getScreenWidth(), height: getScreenHeight() };
        }
    },
    created: function() {
        this.updateScreenDimensions();
        window.addEventListener('resize', this.updateScreenDimensions.bind(this));
    }, 
    onDestroy: function() {
        window.removeEventListener('resize', this.updateScreenDimensions);
    },

};

export { screenWidthMixin };
