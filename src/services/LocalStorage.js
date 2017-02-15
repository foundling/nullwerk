const STORAGE_KEY = 'ei-nullwerk';

const schema = {

    initialized: true,
    oscillators: null, 
    envelope: null

};

class Store {
    constructor({ defaults }) {


        this.defaults = defaults;
        console.log(this.defaults);
        this.localStorage = localStorage || window.localStorage;

        if (!this.localStorage) {
            console.log("warning: localStorage is not supported in your browser. Your settings won't be saved.");
            return;
        }

        this.initialized = !! JSON.parse( this.localStorage.getItem(STORAGE_KEY) || '{}' ).initialized;
        if (!this.initialized) {
            this.localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
        }

    }

    get config() {
        return JSON.parse(this.localStorage.getItem(STORAGE_KEY));
    }

    set config(params) { 
        this.localStorage.setItem(STORAGE_KEY, JSON.stringify(params)); 
    }

    clear() {
        this.localStorage.removeItem(STORAGE_KEY);
    }

};

export default Store;
