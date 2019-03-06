import XPathInterpreter from "./XPathInterpreter";
import UsabilityRefactoring from "./UsabilityRefactoring";

class UsabilityRefactoringOnElement extends UsabilityRefactoring {

    constructor() {
        super();
    }

    setElement(elementXpath) {
        this.elementXpath = elementXpath;
    }

    getElementXpath () {
        return this.elementXpath;
    }

    getElement() {
        return new XPathInterpreter().getSingleElementByXpath(this.elementXpath, document.body);
    }

    initialize () {
        this.targetElement = this.getElement();
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