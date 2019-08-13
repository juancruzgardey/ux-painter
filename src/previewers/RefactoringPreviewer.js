import PageSegmentator from "../segmentator/PageSegmentator";
import StyleScrapper from "../scrappers/StyleScrapper";

class RefactoringPreviewer {

    constructor() {
        this.pageSegmentator = new PageSegmentator();
        this.styleScrapper = new StyleScrapper();
    }

    generatePreviews(aRefactoring) {
        let previewList = [];
        previewList.push(this.cloneRefactoring(aRefactoring));
        return previewList;
    }

    cloneRefactoring(aRefactoring) {
        let clonedRefactoring = aRefactoring.clone(aRefactoring.getContext().cloneNode(true));
        clonedRefactoring.getContext().style.width = window.getComputedStyle(aRefactoring.getContext()).getPropertyValue("width");
        clonedRefactoring.getContext().style.height = window.getComputedStyle(aRefactoring.getContext()).getPropertyValue("height");
        return clonedRefactoring;
    }

}

export default RefactoringPreviewer;