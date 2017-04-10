import { errorMessages } from '../utils';

const STORAGE_KEY = 'nullwerk';
const localStorage = localStorage || window.localStorage;
const Vue = require('vue');
const SCHEMA = {
    currentPresetName: 'default',
    currentPreset: null,
    presets: null
};
const simpleMerge = function(target, src) {
    for (let k in src) {
        if (src[k]) {
            target[k] = src[k];
        }
    }
    return target;
};

class Store {

    constructor({ defaults }) {

        if (!localStorage) {
            return console.log(errorMessages.localStorageNotSupported);
        }

        const initialized = Boolean( localStorage.getItem(STORAGE_KEY) );

        if (!initialized) {
            // doesn't take care of binding current preset
            let defaultStore = JSON.stringify( simpleMerge(defaults, SCHEMA) ); 
            localStorage.setItem(STORAGE_KEY, defaultStore);
        }

        this.data = JSON.parse( localStorage.getItem(STORAGE_KEY) );
        if (!initialized) {
            this.data.currentPreset = this.data.presets.default;
        }
        this._saveAndUpdateStore();
    }
    savePreset(name, settings) {
        this.data.presets[ name ] = settings;
        this._saveAndUpdateStore();
    }
    switchPreset(name) {
        if (this.data.currentPreset[name]) {
            this.data.currentPreset = this.data.presets[name]);
            this.data.currentPresetName = name;
            this._saveAndUpdateStore();
        } else {
            console.error(`${name} not a preset!`);
        }
    }, 
    _saveAndUpdateStore() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        const updatedConfig = JSON.parse(localStorage.getItem(STORAGE_KEY));
        this.data = updatedConfig;
    }
    get currentPreset() {
        return this.data.currentPreset;
    }
    get config() {
        return this.data;
    }
    get allPresets() {
        return this.data.presets;
    }

};

export default Store;
