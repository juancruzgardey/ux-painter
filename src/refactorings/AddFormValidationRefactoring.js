import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import XPathInterpreter from "./XPathInterpreter";
import AddFormValidationView from "../components/AddFormValidationView";

class AddFormValidationRefactoring extends UsabilityRefactoringOnElement {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        let invalidInputs = false;
        this.getRequiredInputs().map(function (requiredInput) {
            if (!requiredInput || !requiredInput.value) {
                requiredInput.style.borderColor = "rgb(255,0,0)";
                invalidInputs = true;
            }
        });
        if (invalidInputs) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return false;
        }
        else {
            this.getElement().submit();
        }
    }

    transform() {
        this.getElement().addEventListener("submit", this.onSubmit);
    }

    unDo() {
        this.getElement().removeEventListener("submit", this.onSubmit);
    }

    checkPreconditions() {
        return super.checkPreconditions() && this.requiredInputXpaths && this.requiredInputXpaths.length > 0;
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

    clone(aContext) {
        let clonedRefactoring = super.clone(aContext);
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

    static getClassName() {
        return "AddFormValidationRefactoring";
    }

    getDescription() {
        return "Provide client validation to a form when the user submits it. Mandatory fields must be indicated";
    }

    
}

export default AddFormValidationRefactoring;