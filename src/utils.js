function merge(target, src) {
    for (let k in src) {
        if (src.hasOwnProperty(k) && src[k]) {
            target[k] = src[k];
        }
    }
    return target;
};

function toComputed(el, prop) {

    const stringifiedWidth = getComputedStyle(el)[prop].replace('px','');
    return parseFloat(stringifiedWidth);

}

function getScreenWidth() {

    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || e.clientWidth || g.clientWidth;

    return width;

};

function getScreenHeight() {

    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    const height = w.innerHeight || e.clientHeight || g.clientHeight;

    return height;

};

const log = console.log;

const errorMessages = {
    localStorageNotSupported: 'Local Storage is Not Supported in Your Browser.' 
};

export { 
    errorMessages,
    getScreenWidth,
    getScreenHeight,
    log,
    merge,
    toComputed
};
