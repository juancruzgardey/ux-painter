import Previewer from "./Previewer";

class TurnInputIntoRadiosPreviewer extends Previewer {

    generatePreviews(aRefactoring) {
        let previews = [];
        const existingStyle = this.findRadioSetStyle();
        if (existingStyle) {
            previews.push(this.createPreviewRefactoring(aRefactoring,existingStyle));
        }
        else {
            const options = [{display: "inline", labelsPosition:"right"}, {display: "block", labelsPosition:"left"},{display:"block", labelsPosition:"right"}];
            for (let i = 0; i < options.length; i++) {
                previews.push(this.createPreviewRefactoring(aRefactoring, options[i]));
            }
        }
        return previews;
    }

    createPreviewRefactoring(aRefactoring, style) {
        // clone refactoring target element and its container
        let preview = this.cloneTargetElement(aRefactoring);

        let previewRefactoring = aRefactoring.clone();

        previewRefactoring.setElement(preview.targetElement);
        previewRefactoring.setDisplayStyle(style.display);
        previewRefactoring.setLabelsPosition(style.labelsPosition);

        previewRefactoring.setLabelsStyle(style.labelsStyle);

        previewRefactoring.targetElementContainer = preview.targetElementContainer;
        return previewRefactoring;

    }

    findRadioSetStyle() {
        let style = {};
        const radio = document.querySelector("input[type='radio']");
        if (!radio) {
            return null;
        }
        let radioLabel;
        if (this.findRadioLabel(radio, "left")) {
            radioLabel = this.findRadioLabel(radio, "left");
            style.labelsPosition = "left";
        } else {
            radioLabel = this.findRadioLabel(radio, "right");
            style.labelsPosition = "right";
        }

        const allRadioItems = document.querySelectorAll("input[name='" + radio.name + "']");
        // all radio items are in the same container, thus they are displayed in line
        if (allRadioItems[0].parentNode == allRadioItems[1].parentNode) {
            style.display = "inline";
        }
        // each radio item has its own container
        else {
            // find the root element of the radio item container to get the display property.
            let currentContainer = radio;
            while (currentContainer.parentElement.querySelectorAll("input[name='" + radio.name + "']").length == 1) {
                currentContainer = currentContainer.parentElement;
                console.log(currentContainer);
            }
            style.display = window.getComputedStyle(currentContainer).getPropertyValue("display");
        }

        style.labelsStyle = {};
        style.labelsStyle["font-family"] = window.getComputedStyle(radioLabel).getPropertyValue("font-family");
        style.labelsStyle["font-weight"] = window.getComputedStyle(radioLabel).getPropertyValue("font-weight");
        style.labelsStyle["font-size"] = window.getComputedStyle(radioLabel).getPropertyValue("font-size");
        style.labelsStyle["margin"] = window.getComputedStyle(radioLabel).getPropertyValue("margin");
        style.labelsStyle["padding"] = window.getComputedStyle(radioLabel).getPropertyValue("padding");

        return style;
    }

    findRadioLabel(inputRadio, position) {

        let nextElement = position == "left" ? inputRadio.previousSibling:inputRadio.nextSibling;
        let radioLabel;
        while (nextElement && !radioLabel) {
            if (nextElement.textContent && nextElement.textContent != " ") {
                return nextElement;
                //style.labelsPosition = position;
            }
            nextElement = position == "left" ? inputRadio.previousSibling:inputRadio.nextSibling;
        }

    }

}

export default TurnInputIntoRadiosPreviewer;