function computeWidth(el) {

    const stringifiedWidth = getComputedStyle(el).width.replace('px','');
    return parseFloat(stringifiedWidth);

}

const log = console.log;

export { 
    log,
    computeWidth 
};
