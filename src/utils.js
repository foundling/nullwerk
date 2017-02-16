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

export { 
    log,
    toComputed,
    getScreenWidth,
    getScreenHeight
};
