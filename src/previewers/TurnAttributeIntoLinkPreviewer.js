import RefactoringOnElementPreviewer from "./RefactoringOnElementPreviewer";

class TurnAttributeIntoLinkPreviewer extends RefactoringOnElementPreviewer {

    constructor() {
        super();
    }


    generatePreviews(aRefactoring) {
        let previews = [];
        if (aRefactoring.isTargetAnImage()) {
            previews.push(aRefactoring);
        }
        else {
            let existingStyles = this.styleScrapper.getStyles("a,input[type='button'],button",
                document, ["color", "background-color", "font-size", "font-family", "margin", "padding", "text-decoration",
                    "text-align","border","border-radius"], aRefactoring.getElement());
            for (let i = 0; i < existingStyles.length; i++) {
                let previewRefactoring = aRefactoring.clone();
                previewRefactoring.setStyleProperty("targetElement",existingStyles[i]);
                previews.push(previewRefactoring);
            }
        }
        return previews;
    }

}

export default TurnAttributeIntoLinkPreviewer;