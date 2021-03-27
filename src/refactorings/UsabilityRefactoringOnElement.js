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
        console.log('----1')
        console.log(document.body)
        console.log('----1')
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

    getSelectionView() {
        return ElementSelectionView;
    }

    clone() {
        let clonedRefactoring = super.clone();
        clonedRefactoring.setElementXpath(this.getElementXpath());
        return clonedRefactoring;
    }

    setStyleProperty(elementName, style) {
        this.getStyle()[elementName] = style;
    }

    isTargetAnImage() {
        return this.getElement().tagName == "IMG";
    }

    static getPreviewer() {
        return new RefactoringOnElementPreviewer();
    }

}

export default UsabilityRefactoringOnElement;