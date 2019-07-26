import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import XPathInterpreter from "./XPathInterpreter";
import AddFormValidationView from "../components/AddFormValidationView";

class AddFormValidationRefactoring extends UsabilityRefactoringOnElement {

    transform() {
        const me = this;
        this.getElement().addEventListener("submit", function (e) {
            let invalidInputs = false;
            me.getRequiredInputs().map(function (requiredInput) {
               if (!requiredInput || !requiredInput.value) {
                   requiredInput.style.borderColor = "rgb(255,0,0)";
                   invalidInputs = true;
               }
            });
            if (invalidInputs) {
                e.preventDefault();
                return false;
            }
            else {
                me.getElement().submit();
            }
        });

    }

    setRequiredInputXpaths(aCollection) {
        this.requiredInputXpaths = aCollection;
    }

    getRequiredInputXpaths() {
        return this.requiredInputXpaths;
    }

    getRequiredInputs() {
        const me = this;
        return this.getRequiredInputXpaths().map(function (inputXpath) {
            return new XPathInterpreter().getSingleElementByXpath(inputXpath, me.getElement());
        });
    }

    targetElements () {
        return "form";
    }

    clone() {
        let clonedRefactoring = super.clone();
        clonedRefactoring.setRequiredInputXpaths(this.getRequiredInputXpaths());
        return clonedRefactoring;
    }

    static asString() {
        return "Add Form Validation";
    }

    getView() {
        return AddFormValidationView;
    }

    serialize() {
        let json = super.serialize();
        json.requiredInputXpaths = this.getRequiredInputXpaths();
        return json;
    }

    
}

export default AddFormValidationRefactoring;