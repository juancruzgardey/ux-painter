import Previewer from "./Previewer";

class TurnInputIntoRadiosPreviewer extends Previewer {

    generatePreviews(aRefactoring) {
        let previews = [];
        const existingStyle = this.findRadioSetStyle();
        if (existingStyle) {
            this.findTextInput(existingStyle);
            previews.push(this.createPreviewRefactoring(aRefactoring,existingStyle));
        }
        else {
            const options = [{radioSetItem: {display: "inline"}, labelsPosition:"right"}, {radioSetItem: {display: "block"}, labelsPosition:"left"},{radioSetItem: {display:"block"}, labelsPosition:"right"}];
            for (let i = 0; i < options.length; i++) {
                this.findTextInput(options[i]);
                previews.push(this.createPreviewRefactoring(aRefactoring, options[i]));
            }
        }
        return previews;
    }

    createPreviewRefactoring(aRefactoring, style) {
        // clone refactoring target element and its container
        let previewRefactoring = this.cloneRefactoring(aRefactoring);

        previewRefactoring.setItemStyle(style.radioSetItem);
        previewRefactoring.setLabelsPosition(style.labelsPosition);

        previewRefactoring.setLabelsStyle(style.labelsStyle);
        previewRefactoring.setOtherInputStyle(style.otherInputStyle);

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
            }
            style.radioSetItem = {};
            style.radioSetItem.display = window.getComputedStyle(currentContainer).getPropertyValue("display");
            style.radioSetItem.margin = window.getComputedStyle(currentContainer).getPropertyValue("margin");
            style.radioSetItem.padding = window.getComputedStyle(currentContainer).getPropertyValue("padding");
        }

        if (radioLabel.nodeType == 1) {
            style.labelsStyle = {};
            style.labelsStyle["font-family"] = window.getComputedStyle(radioLabel).getPropertyValue("font-family");
            style.labelsStyle["font-weight"] = window.getComputedStyle(radioLabel).getPropertyValue("font-weight");
            style.labelsStyle["font-size"] = window.getComputedStyle(radioLabel).getPropertyValue("font-size");
            style.labelsStyle["margin"] = window.getComputedStyle(radioLabel).getPropertyValue("margin");
            style.labelsStyle["padding"] = window.getComputedStyle(radioLabel).getPropertyValue("padding");
        }
        return style;
    }

    findRadioLabel(inputRadio, position) {

        let nextElement = position == "left" ? inputRadio.previousSibling:inputRadio.nextSibling;
        let radioLabel;
        console.log(inputRadio);
        while (nextElement && !radioLabel) {
            //check that text content contains not only spaces
            if (nextElement.textContent && nextElement.textContent.replace(/\s/g, '').length != 0) {
                return nextElement;
            }
            nextElement = position == "left" ? nextElement.previousSibling:nextElement.nextSibling;
        }

    }

    findTextInput(style) {
        const textInput = document.querySelector("input[type='text']");
        if (textInput) {
            style.otherInputStyle = {};
            style.otherInputStyle.border = window.getComputedStyle(textInput).getPropertyValue("border");
            style.otherInputStyle.margin = window.getComputedStyle(textInput).getPropertyValue("margin");
            style.otherInputStyle.padding = window.getComputedStyle(textInput).getPropertyValue("padding");
        }
    }

}

export default TurnInputIntoRadiosPreviewer;