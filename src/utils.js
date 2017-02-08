function toComputedProp(el, prop) {

    const stringifiedWidth = getComputedStyle(el)[prop].replace('px','');
    return parseFloat(stringifiedWidth);

}

const log = console.log;

export { 
    log,
    toComputedProp 
};
