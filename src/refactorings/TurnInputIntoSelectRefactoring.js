import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import TurnInputIntoRadiosView from "../components/TurnInputIntoRadiosView";
import TurnInputIntoSelectPreviewer from "../previewers/TurnInputIntoSelectPreviewer";

class TurnInputIntoSelectRefactoring extends UsabilityRefactoringOnElement {

    setValues(valuesList) {
        this.values = valuesList;
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
        const me = this;
        Object.keys(me.getSelectStyle()).forEach(function (cssProperty) {
            me.selectElement.style[cssProperty] = me.getSelectStyle()[cssProperty];
        });

        Object.keys(me.getOtherInputStyle()).forEach(function (cssProperty) {
            me.otherElement.style[cssProperty] = me.getOtherInputStyle()[cssProperty];
        });

        // set a default margin to other text input
        if (window.getComputedStyle(me.otherElement).getPropertyValue("margin-top") == "0px") {
            me.otherElement.style["margin-top"] = "5px";
        }

    }

    setSelectStyle(style) {
        this.selectStyle = style;
    }

    getSelectStyle() {
        if (!this.selectStyle) {
            return {};
        }
        return this.selectStyle;
    }

    setOtherInputStyle(aStyle) {
        this.otherInputStyle = aStyle;
    }

    getOtherInputStyle() {
        if (!this.otherInputStyle) {
            return {};
        }
        return this.otherInputStyle;
    }

    static asString() {
        return "Turn Input into Select";
    }

    clone() {
        let clonedRefactoring = super.clone();
        clonedRefactoring.setValues(this.values);
        return clonedRefactoring;
    }

    static getPreviewer() {
        return new TurnInputIntoSelectPreviewer();
    }

}

export default TurnInputIntoSelectRefactoring;