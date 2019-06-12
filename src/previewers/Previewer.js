import PageSegmentator from "../segmentator/PageSegmentator";

class Previewer {

    constructor() {
        this.pageSegmentator = new PageSegmentator();
    }

    generatePreviews(aRefactoring) {}

    cloneTargetElement(aRefactoring) {
        const originalTargetElement = aRefactoring.getElement();
        if (!originalTargetElement.getAttribute("data-uxpainter-id")) {
            originalTargetElement.setAttribute("data-uxpainter-id", Math.random().toString(36).substring(2, 15));
        }
        const targetElementContainer = this.pageSegmentator.findPageSegmentOfElement(originalTargetElement);
        const clonedTargetElementContainer = targetElementContainer.cloneNode(true);
        return {
            "targetElement": clonedTargetElementContainer.querySelector("[data-uxpainter-id='" + originalTargetElement.getAttribute("data-uxpainter-id") + "']"),
        "targetElementContainer": clonedTargetElementContainer};
    }
}

export default Previewer;