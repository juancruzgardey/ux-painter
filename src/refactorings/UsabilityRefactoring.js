import StyleScrapper from '../scrappers/StyleScrapper';

class UsabilityRefactoring {
    constructor () {
        this.styleScrapper = new StyleScrapper();
    }

    initialize () {}
    transform () {}
    applyStyle () {}
    static asString () {}

    execute () {
        this.initialize();
        this.transform();
        this.applyStyle();
    }

    isOnElement () {
        return false;
    }

    serialize () {
        return {"refactoring": this.constructor.name}
    }

    createRefactoring(json) {
        return new window[json.refactoring](json);
    }

    getStyleScrapper() {
        return this.styleScrapper;
    }
}

export default UsabilityRefactoring;














    









