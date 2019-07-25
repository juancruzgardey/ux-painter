import XPathInterpreter from "./XPathInterpreter";
import UsabilityRefactoring from "./UsabilityRefactoring";
import ElementSelectionView from "../components/ElementSelectionView";
import Previewer from "../previewers/Previewer";

class UsabilityRefactoringOnElement extends UsabilityRefactoring {

    constructor() {
        super();
    }

    setElementXpath(elementXpath) {
        this.elementXpath = elementXpath;
    }

    setElement(anElement) {
        this.targetElement = anElement;
    }

    getElementXpath () {
        return this.elementXpath;
    }

    getElement() {
        if (!this.targetElement) {
            this.targetElement = new XPathInterpreter().getSingleElementByXpath(this.elementXpath, document.body);
        }
        return this.targetElement;
    }

    initialize () {

    }

    serialize () {
        let json = super.serialize();
        json.elementXpath = this.elementXpath;
        json.style = this.style;
        return json;
    }

    isOnElement () {
        return true;
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


    getStyleElement () {
        return this.targetElement;
    }

    applyStyle () {
        if (!this.style) {
            return
        }
        let newStyle = "";
        if (!this.getStyleElement().getAttribute("style")) {
            newStyle = this.style;
        }
        else {
            newStyle = ";" + this.style;
        }
        this.getStyleElement().setAttribute("style", newStyle);
    }

    clone () {
        let clonedRefactoring = new this.constructor();
        clonedRefactoring.setElement(this.getElement().cloneNode(true));
        return clonedRefactoring;
    }

    setStyle(elementName, style) {
        this.getStyle()[elementName] = style;
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

    static getPreviewer() {
        return new Previewer();
    }

}

export default UsabilityRefactoringOnElement;