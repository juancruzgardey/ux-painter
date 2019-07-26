import Previewer from "./Previewer";
import StyleScrapper from "../scrappers/StyleScrapper";

class ColorPreviewer extends Previewer {

    constructor () {
        super();
        this.previewsQty = 4;
    }

    generatePreviews(aRefactoring) {
        let previews = [];
        let styleScrapper = new StyleScrapper();
        let stylesScrapped = styleScrapper.scrapStyles(aRefactoring.getElement(),aRefactoring.getStyledElementsQty(),this.previewsQty);
        for (let i = 0; i < stylesScrapped.length; i++) {
            const previewRefactoring = this.cloneRefactoring(aRefactoring);
            previewRefactoring.setStyle(stylesScrapped[i]);
            previews.push(previewRefactoring);
        }
        return previews;

    }

}

export default ColorPreviewer;