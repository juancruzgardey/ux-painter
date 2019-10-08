import RefactoringOnElementPreviewer from "./RefactoringOnElementPreviewer";
import WeightStyleScrapper from "../scrappers/WeightStyleScrapper";

let Combinatorics = require('js-combinatorics');

class ColorPreviewer extends RefactoringOnElementPreviewer {

    constructor () {
        super();
        this.styleScrapper = new WeightStyleScrapper();
    }

    generatePreviews(aRefactoring) {
        let previews = [];
        let styles = this.styleScrapper.getStyles("h1,h2,h3,h4,h5,h6,p,span,a, button, input[type='submit']", document,
            ["background-color", "color"], null);
        let styleCombinations = Combinatorics.baseN(styles, aRefactoring.getStyledElementsQty()).toArray();

        for (let i = 0; i < styleCombinations.length; i++) {
            const previewRefactoring = aRefactoring.clone();
            previewRefactoring.assignStyle(styleCombinations[i]);
            previews.push(previewRefactoring);
        }
        return previews;

    }

}

export default ColorPreviewer;