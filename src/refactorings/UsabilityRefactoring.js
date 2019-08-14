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

    setContext(anElement) {
        this.context = anElement;
    }

    getContext() {
        if (!this.context) {
            this.context = document.body;
        }
        return this.context;
    }

    getSelectionView() {
        return ElementSelectionView;
    }

    clone(aContext) {
        let clone = new this.constructor();
        clone.setContext(aContext);
        return clone;
    }

    getElementInContext(anElement) {
        let id = anElement.getAttribute("data-uxpainter-id");
        if (this.getContext().getAttribute("data-uxpainter-id") == id) {
            return this.getContext();
        }
        else {
            return this.getContext().querySelector("[data-uxpainter-id='" + id + "']");
        }
    }

    applyStyles(targetElements,styles) {
        if (!styles) {
            return
        }
        for (let i = 0; i < targetElements.length; i++) {
            Object.keys(styles).forEach(function (cssProperty) {
                targetElements[i].style[cssProperty] = styles[cssProperty];
            });
        }
    }

    highlightElements() {
    }

    removeHighlighting() {
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














    









