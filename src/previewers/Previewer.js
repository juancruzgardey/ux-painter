class Previewer {

    generatePreviews(aRefactoring) {}

    cloneTargetElement(aRefactoring) {
        const originalTargetElement = aRefactoring.getElement();
        if (!originalTargetElement.getAttribute("data-uxpainter-id")) {
            originalTargetElement.setAttribute("data-uxpainter-id", Math.random().toString(36).substring(2, 15));
        }
        const targetElementContainer = originalTargetElement.parentNode.cloneNode(true);
        return targetElementContainer.querySelector("[data-uxpainter-id='" +  originalTargetElement.getAttribute("data-uxpainter-id") + "']");
    }
}

export default Previewer;