import ColorScrapper from '../scrappers/ColorScrapper';
import RefactoringView from "../components/RefactoringView";

class UsabilityRefactoring {
    constructor () {
        this.styleScrapper = new ColorScrapper();
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

    setStyleScrapper(aScrapper) {
        this.styleScrapper = aScrapper;
    }
}

export default UsabilityRefactoring;














    









