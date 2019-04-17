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
        return this.getRequiredInputXpaths().map(function (inputXpath) {
            return new XPathInterpreter().getSingleElementByXpath(inputXpath, document.body);
        });
    }

    targetElements () {
        return "form";
    }

    static asString() {
        return "Add Form Validation";
    }

    getView() {
        return AddFormValidationView;
    }
    
}

export default AddFormValidationRefactoring;