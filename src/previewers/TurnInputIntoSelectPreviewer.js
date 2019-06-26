import Previewer from "./Previewer";

class TurnInputIntoSelectPreviewer extends Previewer {

    generatePreviews(aRefactoring) {
        let existingStyle = [];

        const targetElementContainer = this.pageSegmentator.findPageSegmentOfElement(aRefactoring.getElement());
        let existingSelect = document.querySelector("select");
        let widget;
        // if a select input already exists, border and colors properties are fetched from that input
        if (existingSelect) {
            widget = existingSelect;
            // copy arrow appearance from the other select
            existingStyle["background"] = window.getComputedStyle(widget).getPropertyValue("background");
            existingStyle["-webkit-appearance"] = window.getComputedStyle(widget).getPropertyValue("-webkit-appearance");
        }
        else {
            widget = document.querySelector("input[type='text']");
        }
        existingStyle.border = window.getComputedStyle(widget).getPropertyValue("border");
        existingStyle["border-radius"] = window.getComputedStyle(widget).getPropertyValue("border-radius");
        existingStyle.padding = window.getComputedStyle(widget).getPropertyValue("padding");
        existingStyle.margin = window.getComputedStyle(widget).getPropertyValue("margin");
        existingStyle.color = window.getComputedStyle(widget).getPropertyValue("color");

        // keep the original size of the free input
        existingStyle.width = window.getComputedStyle(aRefactoring.getElement()).getPropertyValue("width");
        existingStyle.height = window.getComputedStyle(aRefactoring.getElement()).getPropertyValue("height");

        let previewRefactoring = this.cloneRefactoring(aRefactoring);
        previewRefactoring.setSelectStyle(existingStyle);
        previewRefactoring.setOtherInputStyle(this.getTextInputStyle());
        let previews = [];
        previews.push(previewRefactoring);
        return previews;
    }

}

export default TurnInputIntoSelectPreviewer;