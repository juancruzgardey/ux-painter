import Previewer from "./Previewer";

class TurnInputIntoSelectPreviewer extends Previewer {

    generatePreviews(aRefactoring) {
        let existingStyle = [];

        const targetElementContainer = this.pageSegmentator.findPageSegmentOfElement(aRefactoring.getElement());
        let existingSelect = document.querySelector("select");
        if (existingSelect) {
            existingStyle.border = window.getComputedStyle(existingSelect).getPropertyValue("border");
            existingStyle.color = window.getComputedStyle(existingSelect).getPropertyValue("color");
            existingStyle["background-color"] = window.getComputedStyle(existingSelect).getPropertyValue("background-color");
            existingStyle.width = window.getComputedStyle(aRefactoring.getElement()).getPropertyValue("width");
            existingStyle.height = window.getComputedStyle(aRefactoring.getElement()).getPropertyValue("height");
        }

        let previewRefactoring = this.cloneRefactoring(aRefactoring);
        previewRefactoring.setStyle(existingStyle);
        let previews = [];
        previews.push(previewRefactoring);
        return previews;
    }

}

export default TurnInputIntoSelectPreviewer;