// considerations
// first load:  
// 
// 
// 
// 
// 

const STORAGE_KEY = 'ei-nullwerk';
const localStorage = localStorage || window.localStorage;

const schema = {

    initialized: true,
    osc: {
        name: '',
        value: '',
    },
    env: {
        name: '',
        value: '',
    }

};

class Store {
    constructor() {

        // check for local storage
        if (!localStorage) {
            console.log("warning: localStorage is not supported in your browser. Your settings won't be saved.");
            return;
        }

        this.initialized = !! JSON.parse( localStorage.getItem(STORAGE_KEY) || '{}' ).initialized;

        if (!this.initialized) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
        }
        console.log(this.initialized);
    }

    get config() {
        JSON.parse(localStorage.getItem(STORAGE_KEY));
    }

    set config(params) { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(params)); 
    }

    clear() {
        localStorage.removeItem(STORAGE_KEY)
    }

};

export default store;
