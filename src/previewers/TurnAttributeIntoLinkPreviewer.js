import Previewer from "./Previewer";
import {DOMElementWrapper} from "../segmentator/PageSegmentator";

class TurnAttributeIntoLinkPreviewer extends Previewer {

    constructor() {
        super();
        this.previewsQty = 10;
    }


    generatePreviews(aRefactoring) {
        const elementSegment = this.pageSegmentator.findPageSegmentOfElement(aRefactoring.getElement());
        let existingLinks = Array.from(elementSegment.querySelectorAll("a,input[type='button'],button"));
        existingLinks.sort(function (a, b) {
            let targetElement = new DOMElementWrapper(aRefactoring.getElement());
            return targetElement.getDistance(new DOMElementWrapper(b)) - targetElement.getDistance(new DOMElementWrapper(a));
        });
        let existingStyles = this.getExistingLinkStyles(existingLinks);
        let previews = [];
        const maxPreviews = existingStyles.length <= this.previewsQty?existingStyles.length:this.previewsQty;
        for (let i = 0; i < maxPreviews; i++) {
            let previewRefactoring = this.cloneRefactoring(aRefactoring);
            previewRefactoring.setStyle("targetElement",existingStyles[i]);
            previews.push(previewRefactoring);
        }
        return previews;
    }


    getExistingLinkStyles(existingLinks) {
        this.styles = [];
        for (let i = 0; i < existingLinks.length; i++) {
            let linkStyle = {};
            linkStyle.color = window.getComputedStyle(existingLinks[i]).getPropertyValue("color");
            linkStyle["background-color"] = window.getComputedStyle(existingLinks[i]).getPropertyValue("background-color");
            linkStyle["font-size"] = window.getComputedStyle(existingLinks[i]).getPropertyValue("font-size");
            linkStyle["font-family"] = window.getComputedStyle(existingLinks[i]).getPropertyValue("font-family");
            linkStyle.margin = window.getComputedStyle(existingLinks[i]).getPropertyValue("margin");
            linkStyle.padding = window.getComputedStyle(existingLinks[i]).getPropertyValue("padding");
            linkStyle["text-decoration"] = window.getComputedStyle(existingLinks[i]).getPropertyValue("text-decoration");
            linkStyle["text-align"] = window.getComputedStyle(existingLinks[i]).getPropertyValue("text-align");
            linkStyle["border"] = window.getComputedStyle(existingLinks[i]).getPropertyValue("border");
            linkStyle["border-radius"] = window.getComputedStyle(existingLinks[i]).getPropertyValue("border-radius");
            if (!this.findStyle(linkStyle)) {
                this.styles.push(linkStyle);
            }
        }
        return this.styles;
    }

    findStyle(anotherStyle) {
        let result = this.styles.filter(function (style) {
           return anotherStyle.color == style.color && anotherStyle["background-color"] == style["background-color"];
        });
        return result.length > 0;
    }

}

export default TurnAttributeIntoLinkPreviewer;