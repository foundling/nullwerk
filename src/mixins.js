import { getScreenWidth } from './utils'; 

const screenWidthMixin =  {

    data: function()  {
        return {
            screenWidth: null,
        }
    },
    methods: {
        updateScreenWidth() {
            this.screenWidth = getScreenWidth();
        }
    },
    created: function() {
        this.updateScreenWidth();
        window.addEventListener('resize', this.updateScreenWidth.bind(this));
    }, 
    onDestroy: function() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },

};

export { screenWidthMixin };
