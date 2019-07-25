import Previewer from "./Previewer";

class TurnInputIntoSelectPreviewer extends Previewer {

    generatePreviews(aRefactoring) {
        let previews = [];

        const targetElementContainer = this.pageSegmentator.findPageSegmentOfElement(aRefactoring.getElement());
        let existingSelects = this.styleScrapper.getStyles("select", targetElementContainer, ["background","-webkit-appearance",
        "border", "border-radius", "padding", "margin", "color"]);

        let existingInputs = this.styleScrapper.getStyles("input", targetElementContainer, ["border", "border-radius",
            "padding", "margin", "color"]);

        let existingStyles = existingSelects.concat(existingInputs);
        for (let i = 0; i < existingStyles.length; i++) {
            existingStyles[i].width = window.getComputedStyle(aRefactoring.getElement()).getPropertyValue("width");
            existingStyles[i].height = window.getComputedStyle(aRefactoring.getElement()).getPropertyValue("height");
            let previewRefactoring = this.cloneRefactoring(aRefactoring);
            previewRefactoring.setSelectStyle(existingStyles[i]);
            previewRefactoring.setOtherInputStyle(this.getTextInputStyle());
            previews.push(previewRefactoring);
        }
        return previews;
    }

}

export default TurnInputIntoSelectPreviewer;