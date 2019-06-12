import Previewer from "./Previewer";
import StyleScrapper from "../scrappers/StyleScrapper";

class AddDatepickerPreviewer extends Previewer {

    constructor () {
        super();
        this.previewsQty = 4;
    }

    generatePreviews(aRefactoring) {
        let previews = [];
        let styleScrapper = new StyleScrapper();
        let stylesScrapped = styleScrapper.scrapStyles(aRefactoring.getElement(),aRefactoring.getStyledElementsQty(),this.previewsQty);
        for (let i = 0; i < stylesScrapped.length; i++) {
            const previewRefactoring = aRefactoring.clone();
            const preview = this.cloneTargetElement(aRefactoring);
            previewRefactoring.setElement(preview.targetElement);
            previewRefactoring.setStyles(stylesScrapped[i]);

            previewRefactoring.targetElementContainer = preview.targetElementContainer;
            previews.push(previewRefactoring);
        }
        return previews;

    }

}

export default AddDatepickerPreviewer;