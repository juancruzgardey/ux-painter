import Previewer from "./Previewer";
import ColorScrapper from "../scrappers/ColorScrapper";

class ColorPreviewer extends Previewer {

    constructor () {
        super();
        this.previewsQty = 4;
    }

    generatePreviews(aRefactoring) {
        let previews = [];
        let styleScrapper = new ColorScrapper();
        let stylesScrapped = styleScrapper.scrapStyles(aRefactoring.getElement(),aRefactoring.getStyledElementsQty(),this.previewsQty);
        for (let i = 0; i < stylesScrapped.length; i++) {
            const previewRefactoring = this.cloneRefactoring(aRefactoring);
            previewRefactoring.setStyles(stylesScrapped[i]);
            previews.push(previewRefactoring);
        }
        return previews;

    }

}

export default ColorPreviewer;