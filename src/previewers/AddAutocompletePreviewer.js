import RefactoringOnElementPreviewer from "./RefactoringOnElementPreviewer";
import ColorPreviewer from "./ColorPreviewer";


class AddAutocompletePreviewer extends RefactoringOnElementPreviewer {

    constructor(props) {
        super(props);
        this.colorsCombinationPreviewer = new ColorPreviewer();
    }


    generatePreviews(aRefactoring) {
        let allPreviews = this.colorsCombinationPreviewer.generatePreviews(aRefactoring);
        if (aRefactoring.hasSelectInputTarget()) {
            const textInputStyle = this.styleScrapper.getStyles("input[type='text']",document,
                ["border","border-radius","margin","padding","height"], this.styleScrapper.sortByDistance)[0];
            if (textInputStyle) {
                allPreviews.map(preview => {
                   preview.getStyle().textInput = textInputStyle;
                });
            }
        }
        return allPreviews;
    }

}

export default AddAutocompletePreviewer;