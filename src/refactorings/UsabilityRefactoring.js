import StyleScrapper from '../scrappers/StyleScrapper';
import XPathInterpreter from "./XPathInterpreter";
import RefactoringPreviewer from "../previewers/RefactoringPreviewer";
import PageSelector from "../PageSelector";
import RefactoringPreview from "../components/RefactoringPreview";

class UsabilityRefactoring {
    constructor() {
        this.styleScrapper = new StyleScrapper();
        this.xpathInterpreter = new XPathInterpreter();
        this.pageSelector = new PageSelector(this);
    }

    initialize() { }
    transform() { }

    static asString() { }

    execute() {
        this.initialize();
        if (this.checkPreconditions()) {
            this.transform();
        }
        else {
            console.log("Invalid refactoring");
        }
    }

    checkPreconditions() {
        return true;
    }

    isOnElement() {
        return false;
    }

    serialize() {
        return { "refactoring": this.constructor.getClassName(), "url": this.getURL(), "style": this.getStyle() };
    }

    createRefactoring(json) {
        return new window[json.refactoring](json);
    }

    setStyle(style) {
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
        return RefactoringPreview;
    }

    clone() {
        let clone = new this.constructor();
        return clone;
    }

    cloneContext(aContext) {
        const clonedElement = aContext.cloneNode(true);
        if (clonedElement.querySelector("#refactoring-extension-root")) {
            console.log("borra root");
            clonedElement.querySelector("#refactoring-extension-root").parentNode.removeChild(clonedElement.querySelector("#refactoring-extension-root"));
        }
        return clonedElement;
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

    getElementsXpath(elements) {
        const me = this;
        return elements.map(element => {
            return me.xpathInterpreter.getPath(me.getElementInContext(element), me.getContext())[0];
        });
    }

    applyStyles(targetElements, styles) {
        if (!styles) {
            return
        }
        for (let i = 0; i < targetElements.length; i++) {
            Object.keys(styles).forEach(function (cssProperty) {
                targetElements[i].style[cssProperty] = styles[cssProperty];
            });
        }
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

    static getPreviewer() {
        return new RefactoringPreviewer();
    }

    getDescription() {
        return "";
    }

    getDemoResources() {
        return null;
    }

    imports() {
        return []
    }

    mounts(elementWord, randomInt) {
        return []
    }

    functions(elementWord, randomInt) {
        return []
    }

    styles(elementWord, randomInt) {
        return []
    }
}

export default UsabilityRefactoring;
























