const STORAGE_KEY = 'nullwerk';
const localStorage = localStorage || window.localStorage;

/*
 *
 * local storage schema:
 * config 
 *      currentPresetName
 *      presets
 *
 */

const errorMsgs = {
    notSupported: "[ Error ] LocalStorage is not supported in your browser. Your settings won't be saved."
};

class Store {

    constructor({ defaults }) {

        if (!localStorage) {
            return console.log(errorMsgs.notSupported);
        }

        const initialized = !!localStorage.getItem(STORAGE_KEY);

        if (!initialized) {
            let defaultStore = JSON.stringify(defaults); 
            localStorage.setItem(STORAGE_KEY, defaultStore);
        }

        this.config = JSON.parse( localStorage.getItem(STORAGE_KEY) );
        this.config.currentPreset = initialized ? 
                                    this.config.presets[ this.config.currentPresetName ] : 
                                    this.config.presets.default; 
    }
    _saveToLocalStorage() {
    }
    updatePreset(name, settings) {

        this.addPreset(name, settings);

    }
    addPreset(name, settings) {

        this.config.presets[ name ] = settings;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
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
