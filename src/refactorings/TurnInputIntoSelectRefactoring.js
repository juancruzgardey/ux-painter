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
            let otherElement = document.createElement("input");
            otherElement.setAttribute("type", "text");
            otherElement.style.display = "none";

            this.selectElement = document.createElement("select");

            this.values.push("Other");
            for (let i = 0; i < this.values.length; i++) {
                let optionElement = document.createElement("option");
                optionElement.textContent = this.values[i];
                this.selectElement.appendChild(optionElement);
            }

            anElement.parentNode.insertBefore(otherElement, anElement.nextSibling);
            anElement.parentNode.insertBefore(this.selectElement, anElement.nextSibling);

            const me = this;
            this.selectElement.addEventListener("change", function () {
                if (me.selectElement.value == "Other") {
                    otherElement.value = "";
                    otherElement.style.display = "inline";
                    anElement.value = "";
                }
                else {
                    otherElement.style.display = "none";
                    anElement.value = me.selectElement.value;
                }
            });
            otherElement.addEventListener("keyup", function () {
                anElement.value = otherElement.value;
            });

            this.applyStyle();
    }

    targetElements () {
        return "input[type='text']";
    }

    getView() {
        return TurnInputIntoRadiosView;
    }

    applyStyle() {
        const me = this;
        Object.keys(me.getStyle()).forEach(function (cssProperty) {
            me.selectElement.style[cssProperty] = me.getStyle()[cssProperty];
        });
    }

    setStyle(style) {
        this.style = style;
    }

    getStyle() {
        if (!this.style) {
            return {};
        }
        return this.style;
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