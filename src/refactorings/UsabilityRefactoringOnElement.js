import XPathInterpreter from "./XPathInterpreter";
import UsabilityRefactoring from "./UsabilityRefactoring";

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

}

export default UsabilityRefactoringOnElement;