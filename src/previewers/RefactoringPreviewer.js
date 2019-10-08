import PageSegmentator from "../segmentator/PageSegmentator";
import DistanceStyleScrapper from "../scrappers/DistanceStyleScrapper";

class RefactoringPreviewer {

    constructor() {
        this.pageSegmentator = new PageSegmentator();
        this.styleScrapper = new DistanceStyleScrapper();
        this.previewsQty = 5;
    }

    generatePreviews(aRefactoring) {
        let previewList = [];
        previewList.push(aRefactoring.clone());
        return previewList;
    }

    getPreviews(aRefactoring) {
        let previews = this.generatePreviews(aRefactoring);
        return previews.length > 5 ? previews.slice(0, this.previewsQty): previews;
    }

    cloneRefactoring(aRefactoring) {
        let clonedRefactoring = aRefactoring.clone();
        clonedRefactoring.getContext().style.width = window.getComputedStyle(aRefactoring.getContext()).getPropertyValue("width");
        clonedRefactoring.getContext().style.height = window.getComputedStyle(aRefactoring.getContext()).getPropertyValue("height");
        return clonedRefactoring;
    }

}

export default RefactoringPreviewer;