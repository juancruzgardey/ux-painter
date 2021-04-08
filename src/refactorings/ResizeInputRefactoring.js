import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import ResizeInputRefactoringView from "../components/ResizeInputRefactoringView";

class ResizeInputRefactoring extends UsabilityRefactoringOnElement {

    constructor() {
        super();
    }

    checkPreconditions() {
        return super.checkPreconditions() && this.getInputWidth();
    }

    transform() {
        this.getElement().style.width = this.getInputWidth() + "px";
    }

    unDo() {
        this.getElement().style.width = "";
    }

    setInputWidth(inputWidth) {
        this.inputWidth = inputWidth;
    }

    getInputWidth() {
        return this.inputWidth;
    }

    getView() {
        return ResizeInputRefactoringView;
    }

    targetElements() {
        return "input";
    }

    clone() {
        let clonedRefactoring = super.clone();
        clonedRefactoring.setInputWidth(this.getInputWidth());
        return clonedRefactoring;
    }

    serialize() {
        let json = super.serialize();
        json.inputWidth = this.getInputWidth();
        return json;
    }

    static asString() {
        return "Resize Input";
    }

    static getClassName() {
        return "ResizeInputRefactoring";
    }

    getDescription() {
        return "Change the length of a text field according to the average text length that is usually entered";
    }

    //

    styles(elementWord, randomInt) {
        return ["#" + elementWord + randomInt.toString() + " {\nwidth: " + this.inputWidth + "px;\n}"]
    }

    codeAvaiable() {
        return true
    }

}

export default ResizeInputRefactoring;