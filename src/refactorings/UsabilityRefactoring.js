import StyleScrapper from '../scrappers/StyleScrapper';
import RefactoringView from "../components/RefactoringView";
import ElementSelectionView from "../components/ElementSelectionView";

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

    setStyle (style) {
        this.style = style;
    }

    getStyle() {
        if (!this.style) {
            this.style = {};
        }
        return this.style;
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

    getSelectionView() {
        return ElementSelectionView;
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














    









