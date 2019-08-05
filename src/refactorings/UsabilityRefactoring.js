import StyleScrapper from '../scrappers/StyleScrapper';
import RefactoringView from "../components/RefactoringView";

class UsabilityRefactoring {
    constructor () {
        this.styleScrapper = new StyleScrapper();
    }

    initialize () {}
    transform () {}

    static asString () {}

    execute () {
        this.initialize();
        this.transform();
    }

    isOnElement () {
        return false;
    }

    serialize () {
        return {"refactoring": this.constructor.getClassName(), "url": this.getURL()};
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

    static fromJSON(json) {
        let refactoring = new (window.refactoringManager.getRefactoringClass(json.refactoring));
        Object.keys(json).map(function (key) {
           refactoring[key] = json[key];
        });
        return refactoring;
    }

    static getClassName() {
        return "";
    }
}

export default UsabilityRefactoring;














    









