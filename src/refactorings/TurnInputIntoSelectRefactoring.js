import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import TurnInputIntoRadiosView from "../components/TurnInputIntoRadiosView";

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

            let selectElement = document.createElement("select");

            this.values.push("Other");
            for (let i = 0; i < this.values.length; i++) {
                let optionElement = document.createElement("option");
                optionElement.textContent = this.values[i];
                selectElement.appendChild(optionElement);
            }

            anElement.parentNode.insertBefore(otherElement, anElement.nextSibling);
            anElement.parentNode.insertBefore(selectElement, anElement.nextSibling);

            selectElement.addEventListener("change", function () {
                if (selectElement.value == "Other") {
                    otherElement.value = "";
                    otherElement.style.display = "inline";
                    anElement.value = "";
                }
                else {
                    otherElement.style.display = "none";
                    anElement.value = selectElement.value;
                }
            });
            otherElement.addEventListener("keyup", function () {
                anElement.value = otherElement.value;
            });
    }

    targetElements () {
        return "input[type='text']";
    }

    getView() {
        return TurnInputIntoRadiosView;
    }

    static asString() {
        return "Turn Input into Select";
    }

    clone() {
        let clonedRefactoring = super.clone();
        clonedRefactoring.setValues(this.values);
        return clonedRefactoring;
    }

}

export default TurnInputIntoSelectRefactoring;