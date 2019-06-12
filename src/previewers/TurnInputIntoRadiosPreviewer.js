import Previewer from "./Previewer";

class TurnInputIntoRadiosPreviewer extends Previewer {

    generatePreviews(aRefactoring) {
        let previews = [];
        const options = [["inline", "right"], ["block", "left"],["block", "right"]];

        for (let i = 0; i < options.length; i++) {
            let previewTargetElement = this.cloneTargetElement(aRefactoring);
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