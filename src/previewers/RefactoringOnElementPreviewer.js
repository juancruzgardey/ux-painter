import PageSegmentator from "../segmentator/PageSegmentator";
import StyleScrapper from "../scrappers/StyleScrapper";

class RefactoringOnElementPreviewer {

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
        const originalTargetElement = aRefactoring.getElement();
        if (!originalTargetElement.getAttribute("data-uxpainter-id")) {
            originalTargetElement.setAttribute("data-uxpainter-id", Math.random().toString(36).substring(2, 15));
        }
        const targetElementContainer = this.pageSegmentator.findPageSegmentOfElement(originalTargetElement);
        const clonedTargetElementContainer = targetElementContainer.cloneNode(true);

        clonedTargetElementContainer.style.width = window.getComputedStyle(targetElementContainer).getPropertyValue("width");
        clonedTargetElementContainer.style.height = window.getComputedStyle(targetElementContainer).getPropertyValue("height");

        let previewRefactoring = aRefactoring.clone();
        previewRefactoring.setElement(this.findTargetElement(clonedTargetElementContainer,originalTargetElement.getAttribute("data-uxpainter-id")));
        previewRefactoring.targetElementContainer = clonedTargetElementContainer;
        return previewRefactoring;
    }

    findTargetElement(targetElementContainer, targetElementID) {
        if (targetElementContainer.getAttribute("data-uxpainter-id") == targetElementID) {
            return targetElementContainer;
        }
        else {
            return targetElementContainer.querySelector("[data-uxpainter-id='" + targetElementID + "']");
        }
    }

    getTextInputStyle() {
        const textInput = document.querySelector("input[type='text']");
        let style = {};
        if (textInput) {
            style.border = window.getComputedStyle(textInput).getPropertyValue("border");
            style["border-radius"] = window.getComputedStyle(textInput).getPropertyValue("border-radius");
            style.margin = window.getComputedStyle(textInput).getPropertyValue("margin");
            style.padding = window.getComputedStyle(textInput).getPropertyValue("padding");
        }
        return style;
    }

}

export default RefactoringOnElementPreviewer;