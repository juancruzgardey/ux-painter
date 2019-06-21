import PageSegmentator from "../segmentator/PageSegmentator";

class Previewer {

    constructor() {
        this.pageSegmentator = new PageSegmentator();
    }

    generatePreviews(aRefactoring) {
        let previewList = [];
        previewList.push(this.cloneRefactoring(aRefactoring));
        return previewList;
    }

    cloneRefactoring(aRefactoring) {
        const originalTargetElement = aRefactoring.getElement();
        if (!originalTargetElement.getAttribute("data-uxpainter-id")) {
            originalTargetElement.setAttribute("data-uxpainter-id", Math.random().toString(36).substring(2, 15));
        }
        const targetElementContainer = this.pageSegmentator.findPageSegmentOfElement(originalTargetElement);
        const clonedTargetElementContainer = targetElementContainer.cloneNode(true);

        let previewRefactoring = aRefactoring.clone();
        previewRefactoring.setElement(clonedTargetElementContainer.querySelector("[data-uxpainter-id='" +
            originalTargetElement.getAttribute("data-uxpainter-id") + "']"));
        previewRefactoring.targetElementContainer = clonedTargetElementContainer;
        return previewRefactoring;
    }
}

export default Previewer;