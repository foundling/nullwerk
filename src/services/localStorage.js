const STORAGE_KEY = 'ei-nullwerk';
const localStorage = localStorage || window.localStorage;

const schema = {

    osc: {
        name: '',
        value: '',
    },
    env: {
        name: '',
        value: '',
    }

};

const store = {
    init: () => {
        if (!localStorage) {
            console.log("warning: localStorage is not supported in your browser. Your settings won't be saved.");
            return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
    },
    get: () => JSON.parse(localStorage.getItem(STORAGE_KEY)),
    set: params => { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(params)); 
    }
};

export default store;
