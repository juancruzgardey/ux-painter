import Previewer from "./Previewer";

class DateInputIntoSelectsPreviewer extends Previewer {

    generatePreviews(aRefactoring) {
        let previews = [];

        const targetElementContainer = this.pageSegmentator.findPageSegmentOfElement(aRefactoring.getElement());
        let existingStyles = this.styleScrapper.getStyles("select", targetElementContainer, ["background",
            "-webkit-appearance", "border", "border-radius", "padding", "margin", "color", "height"]);
        if (existingStyles.length == 0) {
            existingStyles = this.styleScrapper.getStyles("input[type='text']", targetElementContainer, ["background",
                "border", "border-radius", "padding", "margin", "color", "height"]);
            if (existingStyles.length == 0) {
                previews.push(this.cloneRefactoring(aRefactoring));
            }
        }
        for (let i = 0; i < existingStyles.length; i++) {
            let previewRefactoring = this.cloneRefactoring(aRefactoring);
            if (!existingStyles[i]["margin-right"]) {
                existingStyles[i]["margin-right"] = "10px";
            }
            previewRefactoring.setStyle("selectElement",existingStyles[i]);
            previews.push(previewRefactoring);
        }
        return previews;
    }
}

export default DateInputIntoSelectsPreviewer;