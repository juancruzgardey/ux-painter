class TurnInputIntoRadiosPreviewer {

    generatePreviews(aRefactoring) {
        let previews = [];
        const options = [["inline", "right"], ["block", "left"],["block", "right"]];

        this.originalTargetElement = aRefactoring.getElement();
        this.originalTargetElement.setAttribute("data-uxpainter-id", Math.random().toString(36).substring(2, 15));

        for (let i = 0; i < options.length; i++) {
            const targetElementContainer = this.originalTargetElement.parentNode.cloneNode(true);
            let previewTargetElement = targetElementContainer.querySelector("[data-uxpainter-id='" +  this.originalTargetElement.getAttribute("data-uxpainter-id") + "']");
            let previewRefactoring = aRefactoring.clone();
            previewRefactoring.setElement(previewTargetElement);
            previewRefactoring.setDisplayStyle(options[i][0]);
            previewRefactoring.setLabelsPosition(options[i][1]);
            previews.push(previewRefactoring);
        }
        return previews;
    }
}

export default TurnInputIntoRadiosPreviewer;