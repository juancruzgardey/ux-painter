import RefactoringPreviewer from "./RefactoringPreviewer";

class RefactoringOnElementPreviewer extends RefactoringPreviewer {

    constructor() {
        super();
    }

    cloneRefactoring(aRefactoring) {
        const originalTargetElement = aRefactoring.getElement();
        const targetElementContainer = this.pageSegmentator.findPageSegmentOfElement(originalTargetElement);

        let previewRefactoring = aRefactoring.clone(targetElementContainer);
        previewRefactoring.getContext().style.width = window.getComputedStyle(targetElementContainer).getPropertyValue("width");
        previewRefactoring.getContext().style.height = window.getComputedStyle(targetElementContainer).getPropertyValue("height");

        previewRefactoring.setElement(this.findTargetElement(previewRefactoring.getContext(),originalTargetElement.getAttribute("data-uxpainter-id")));
        return previewRefactoring;
    }

    findTargetElement(targetElementContainer, targetElementID) {
        if (targetElementContainer.getAttribute("data-uxpainter-id") == targetElementID) {
            return targetElementContainer;
        }
        else {
            return targetElementContainer.querySelector("[data-uxpainter-id='" + targetElementID + "']");
        }
    }

    getTextInputStyle() {
        const textInput = document.querySelector("input[type='text']");
        let style = {};
        if (textInput) {
            style.border = window.getComputedStyle(textInput).getPropertyValue("border");
            style["border-radius"] = window.getComputedStyle(textInput).getPropertyValue("border-radius");
            style.margin = window.getComputedStyle(textInput).getPropertyValue("margin");
            style.padding = window.getComputedStyle(textInput).getPropertyValue("padding");
        }
        return style;
    }

}

export default RefactoringOnElementPreviewer;