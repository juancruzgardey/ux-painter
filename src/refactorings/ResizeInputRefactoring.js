import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import ResizeInputRefactoringView from "../components/ResizeInputRefactoringView";

class ResizeInputRefactoring extends UsabilityRefactoringOnElement {
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

}

export default ResizeInputRefactoring;