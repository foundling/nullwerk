import { errorMessages } from '../utils';

const STORAGE_KEY = 'nullwerk';
const localStorage = localStorage || window.localStorage;
const Vue = require('vue');
const SCHEMA = {
    currentPresetName: 'default',
    currentPreset: null,
    presets: null
};

const merge = function(target, src) {
    for (let k in src) {
        if (src.hasOwnProperty(k)) {
            if (src[k]) {
                target[k] = src[k];
            }
        }
    }
    return target;
};

class Store {

    constructor({ defaults }) {

        console.warn('DEBUG: Clearing Local Storage');
        localStorage.removeItem(STORAGE_KEY);

        if (!localStorage) return console.warn(errorMessages.localStorageNotSupported);

        const initialized = Boolean( localStorage.getItem(STORAGE_KEY) );

        if (!initialized) {
            // doesn't take care of binding current preset
            let defaultStore = JSON.stringify( merge(defaults, SCHEMA) ); 
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
    changePreset(name) {
        if (!this.data.presets[name]) return console.error(`${name} not a preset!`);
        this.data.currentPreset = this.data.presets[name];
        this.data.currentPresetName = name;
        this._saveAndUpdateStore();
    } 
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
