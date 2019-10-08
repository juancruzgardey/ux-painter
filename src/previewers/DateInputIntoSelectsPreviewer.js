import RefactoringOnElementPreviewer from "./RefactoringOnElementPreviewer";

class DateInputIntoSelectsPreviewer extends RefactoringOnElementPreviewer {

    generatePreviews(aRefactoring) {
        let previews = [];
        const targetElementContainer = this.pageSegmentator.findPageSegmentOfElement(aRefactoring.getElement());
        let existingStyles = this.styleScrapper.getStyles("select", document, ["background",
            "-webkit-appearance", "border", "border-radius", "padding", "margin", "color", "height"], aRefactoring.getElement());
        if (existingStyles.length == 0) {
            existingStyles = this.styleScrapper.getStyles("input[type='text']", document, ["background",
                "border", "border-radius", "padding", "margin", "color", "height"], aRefactoring.getElement());
            if (existingStyles.length == 0) {
                previews.push(aRefactoring.clone());
            }
        }
        for (let i = 0; i < existingStyles.length; i++) {
            let previewRefactoring = aRefactoring.clone();
            if (!existingStyles[i]["margin-right"]) {
                existingStyles[i]["margin-right"] = "10px";
            }
            previewRefactoring.setStyleProperty("selectElement",existingStyles[i]);
            previews.push(previewRefactoring);
        }
        return previews;
    }
}

export default DateInputIntoSelectsPreviewer;