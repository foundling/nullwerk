const STORAGE_KEY = 'ei-nullwerk';
const localStorage = localStorage || window.localStorage;

/*
 *
 * local storage schema:
 * config 
 *      currentPresetName
 *      presets
 *
 */

class Store {

    constructor({ defaults }) {
        if (!localStorage) return console.log("[ Error ] LocalStorage is not supported in your browser. Your settings won't be saved.");
        const initialized = !!localStorage.getItem(STORAGE_KEY);
        if (!initialized) localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
        this.config = JSON.parse( localStorage.getItem(STORAGE_KEY) );
        this.config.currentPreset = initialized ? this.config.presets[ this.config.currentPresetName ] : this.config.presets.default; 
    }

    _saveToLocalStorage() {
    }

    updatePreset(name, settings) {
        this.addPreset(name, settings);
    }

    addPreset(name, settings) {

        this.config.presets[ name ] = settings;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config, null, 2));
        const updatedConfig = JSON.parse(localStorage.getItem(STORAGE_KEY));
        this.config = updatedConfig;

    }
    getConfig() {
        return this.config;
    }
    get allPresets() {
        return this.config.presets;
    }


};

export default Store;
