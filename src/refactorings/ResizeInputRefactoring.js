import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import ResizeInputRefactoringView from "../components/ResizeInputRefactoringView";

class ResizeInputRefactoring extends UsabilityRefactoringOnElement {

    constructor() {
        super();
    }

    transform() {
        this.getElement().style.width = this.getInputWidth() + "px";
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

    clone(aContext) {
        let clonedRefactoring = super.clone(aContext);
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

}

export default ResizeInputRefactoring;