import XPathInterpreter from "./XPathInterpreter";
import UsabilityRefactoring from "./UsabilityRefactoring";
import ElementSelectionView from "../components/ElementSelectionView";
import RefactoringOnElementPreviewer from "../previewers/RefactoringOnElementPreviewer";

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

    checkPreconditions() {
        return this.getElement() !== undefined;
    }


    serialize () {
        let json = super.serialize();
        json.elementXpath = this.getElementXpath();
        return json;
    }

    isOnElement () {
        return true;
    }

    getStyleElement () {
        return this.targetElement;
    }

    clone() {
        let clonedRefactoring = super.clone();
        clonedRefactoring.setElementXpath(this.getElementXpath());
        return clonedRefactoring;
    }

    setStyleProperty(elementName, style) {
        this.getStyle()[elementName] = style;
    }

    static getPreviewer() {
        return new RefactoringOnElementPreviewer();
    }

}

export default UsabilityRefactoringOnElement;