import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import TurnInputIntoRadiosView from "../components/TurnInputIntoRadiosView";
import TurnInputIntoSelectPreviewer from "../previewers/TurnInputIntoSelectPreviewer";

class TurnInputIntoSelectRefactoring extends UsabilityRefactoringOnElement {

    setValues(valuesList) {
        this.values = valuesList;
    }

    getValues() {
        return this.values;
    }

    transform() {
            let anElement = this.getElement();
            if (typeof (anElement) === "undefined" ) {
                return
            }
            anElement.setAttribute("type", "hidden");
            this.otherElement = document.createElement("input");
            this.otherElement.setAttribute("type", "text");
            this.otherElement.setAttribute("placeholder", "Enter new value");
            this.otherElement.style.display = "none";

            this.selectElement = document.createElement("select");

            for (let i = 0; i < this.values.length; i++) {
                this.createOption(this.values[i]);
            }
            this.createOption("Other");

            anElement.parentNode.insertBefore(this.otherElement, anElement.nextSibling);
            anElement.parentNode.insertBefore(this.selectElement, anElement.nextSibling);

            const me = this;
            this.selectElement.addEventListener("change", function () {
                if (me.selectElement.value == "Other") {
                    me.otherElement.value = "";
                    me.otherElement.style.display = "inline";
                    anElement.value = "";
                }
                else {
                    me.otherElement.style.display = "none";
                    anElement.value = me.selectElement.value;
                }
            });
            me.otherElement.addEventListener("keyup", function () {
                anElement.value = me.otherElement.value;
            });

            this.applyStyle();
    }

    unDo() {
        this.getElement().parentNode.removeChild(this.selectElement);
        this.getElement().parentNode.removeChild(this.otherElement);
        this.getElement().setAttribute("type", "text");
    }

    checkPreconditions () {
        return super.checkPreconditions() && this.getValues() && this.getValues().length > 0;
    }

    createOption(value) {
        let optionElement = document.createElement("option");
        optionElement.textContent = value;
        this.selectElement.appendChild(optionElement);
    }

    targetElements () {
        return "input[type='text']";
    }

    getView() {
        return TurnInputIntoRadiosView;
    }

    applyStyle() {
        this.applyStyles([this.selectElement], this.getStyle().targetElement);
        this.applyStyles([this.otherElement], this.getStyle().otherInput);

        // set a default margin to other text input
        if (window.getComputedStyle(this.otherElement).getPropertyValue("margin-top") == "0px") {
            this.otherElement.style["margin-top"] = "5px";
        }
    }

    setSelectStyle(style) {
        this.getStyle()["targetElement"] = style;
    }

    setOtherInputStyle(aStyle) {
        this.getStyle()["otherInput"] = aStyle;
    }

    clone(aContext) {
        let clonedRefactoring = super.clone(aContext);
        clonedRefactoring.setValues(this.values);
        return clonedRefactoring;
    }

    serialize() {
        let json = super.serialize();
        json.values = this.getValues();
        return json;
    }

    static asString() {
        return "Turn Input into Select";
    }

    static getPreviewer() {
        return new TurnInputIntoSelectPreviewer();
    }

    static getClassName() {
        return "TurnInputIntoSelectRefactoring";
    }

    getDescription() {
        return "Turn a regular text field into a select box with predefined values. 'Other' option is included to enter a different value";
    }

}

export default TurnInputIntoSelectRefactoring;