const STORAGE_KEY = 'ei-nullwerk';
const localStorage = localStorage || window.localStorage;

class Store {
    constructor({ defaults }) {

        const initialized = !!localStorage.getItem(STORAGE_KEY);
        console.log('initialized:', initialized);

        if (!localStorage) {
            console.log("warning: localStorage is not supported in your browser. Your settings won't be saved.");
            return;
        }

        if (!initialized) {
            console.log('using defaults');
            let stringifiedDefaults = JSON.stringify(defaults); 
            localStorage.setItem(STORAGE_KEY, stringifiedDefaults);
        }

    }

    get config() {
        //console.log('get', JSON.parse(localStorage.getItem(STORAGE_KEY)) );
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }

    set config(params) { 
        //console.log(JSON.stringify(params, null, 2));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(params)); 
    }

    clear() {
        localStorage.removeItem(STORAGE_KEY);
    }

};

export default Store;
