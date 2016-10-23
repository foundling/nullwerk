export default class FrequencyCalculator {

    constructor () {
    }


    indexToFrequency(index) {
        return 440 * Math.pow(Math.pow(2, 1/12), index); 
    }
}
