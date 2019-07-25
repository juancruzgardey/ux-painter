import Previewer from "./Previewer";

class TurnInputIntoTextareaPreviewer extends Previewer {

    generatePreviews(aRefactoring) {
        let previews = [];
        const targetElementContainer = this.pageSegmentator.findPageSegmentOfElement(aRefactoring.getElement());

        let existingTextareas = this.styleScrapper.getStyles("textarea", targetElementContainer, ["background", "border", "border-radius", "padding", "margin", "width", "height"]);
        let existingTextinputs = this.styleScrapper.getStyles("input[type='text']", targetElementContainer, ["background", "border", "border-radius", "padding", "margin", "width"]);

        let existingStyles = existingTextareas.concat(existingTextinputs);
        for (let i = 0; i < existingStyles.length; i++) {
            let previewRefactoring = this.cloneRefactoring(aRefactoring);
            previewRefactoring.setStyle("targetElement", existingStyles[i]);
            previews.push(previewRefactoring);
        }
        return previews;
    }
}

export default TurnInputIntoTextareaPreviewer;