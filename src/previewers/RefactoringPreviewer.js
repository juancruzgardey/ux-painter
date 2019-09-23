import PageSegmentator from "../segmentator/PageSegmentator";
import StyleScrapper from "../scrappers/StyleScrapper";

class RefactoringPreviewer {

    constructor() {
        this.pageSegmentator = new PageSegmentator();
        this.styleScrapper = new StyleScrapper();
    }

    generatePreviews(aRefactoring) {
        let previewList = [];
        previewList.push(aRefactoring.clone());
        return previewList;
    }

    cloneRefactoring(aRefactoring) {
        let clonedRefactoring = aRefactoring.clone();
        clonedRefactoring.getContext().style.width = window.getComputedStyle(aRefactoring.getContext()).getPropertyValue("width");
        clonedRefactoring.getContext().style.height = window.getComputedStyle(aRefactoring.getContext()).getPropertyValue("height");
        return clonedRefactoring;
    }

}

export default RefactoringPreviewer;