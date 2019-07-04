import Previewer from "./Previewer";

class TurnAttributeIntoLinkPreviewer extends Previewer {

    constructor() {
        super();
        this.previewsQty = 10;
    }


    generatePreviews(aRefactoring) {
        let existingStyles = this.getExistingLinkStyles();
        let previews = [];
        const maxPreviews = existingStyles.length <= this.previewsQty?existingStyles.length:this.previewsQty;
        for (let i = 0; i < maxPreviews; i++) {
            let previewRefactoring = this.cloneRefactoring(aRefactoring);
            previewRefactoring.setStyle(existingStyles[i]);
            previews.push(previewRefactoring);
        }
        return previews;
    }


    getExistingLinkStyles() {
        this.styles = [];
        let existingLinks = document.querySelectorAll("a", "input[type='button']");
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
            if (!this.findStyle(linkStyle)) {
                this.styles.push(linkStyle);
                console.log(linkStyle);
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