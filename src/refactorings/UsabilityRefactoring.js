import StyleScrapper from '../scrappers/StyleScrapper';
import RefactoringView from "../components/RefactoringView";

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
        return {"refactoring": this.constructor.name, "url": this.getURL()};
    }

    createRefactoring(json) {
        return new window[json.refactoring](json);
    }

    getStyleScrapper() {
        return this.styleScrapper;
    }

    setStyleScrapper(aScrapper) {
        this.styleScrapper = aScrapper;
    }

    setURL(url) {
        this.url = url;
    }

    getURL() {
        return this.url;
    }
}

export default UsabilityRefactoring;














    









