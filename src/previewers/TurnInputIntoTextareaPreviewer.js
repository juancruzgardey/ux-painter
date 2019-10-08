import RefactoringOnElementPreviewer from "./RefactoringOnElementPreviewer";

class TurnInputIntoTextareaPreviewer extends RefactoringOnElementPreviewer {

    generatePreviews(aRefactoring) {
        let previews = [];
        const targetElementContainer = this.pageSegmentator.findPageSegmentOfElement(aRefactoring.getElement());

        let existingTextareas = this.styleScrapper.getStyles("textarea", document,
            ["background", "border", "border-radius", "padding", "margin", "width", "height"], aRefactoring.getElement());
        let existingTextinputs = this.styleScrapper.getStyles("input[type='text']", document,
            ["background", "border", "border-radius", "padding", "margin", "width"], aRefactoring.getElement());

        let existingStyles = existingTextareas.concat(existingTextinputs);
        for (let i = 0; i < existingStyles.length; i++) {
            let previewRefactoring = aRefactoring.clone();
            previewRefactoring.setStyleProperty("targetElement", existingStyles[i]);
            previews.push(previewRefactoring);
        }
        return previews;
    }
}

export default TurnInputIntoTextareaPreviewer;