import AddFormValidationRefactoring from "./AddFormValidationRefactoring";

class AddInlineFormValidationRefactoring extends AddFormValidationRefactoring {

    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onBlur(e) {
        if (!e.target || !e.target.value) {
            e.target.style.borderColor = "rgb(255,0,0)";
            this.inputStates[this.xpathInterpreter.getPath(e.target, document.body)] = false;
        }
        else {
            e.target.style.borderColor = "";
            this.inputStates[this.xpathInterpreter.getPath(e.target, document.body)] = true;
        }
    }

    onSubmit(event) {
        let invalidInput = false;
        const me = this;
        Object.keys(this.inputStates).forEach(function (key) {
            if (!me.inputStates[key]) {
                invalidInput = true;
                return false;
            }
        });
        if (!invalidInput) {
            event.target.submit();
        }
    }

    transform() {
        this.inputStates = {};
        const me = this;
        for (let i = 0; i < this.requiredInputXpaths.length; i++) {
            this.inputStates[this.requiredInputXpaths[i]] = false;
            let input = this.xpathInterpreter.getSingleElementByXpath(this.requiredInputXpaths[i], document.body);
            input.addEventListener("blur", this.onBlur);
        }
        this.getElement().addEventListener("submit", this.onSubmit);
    }

    unDo() {
        this.getElement().removeEventListener("submit", this.onSubmit);
        const me = this;
        this.getRequiredInputs().map(requiredInput => {
            requiredInput.removeEventListener("blur", me.onBlur);
        })
    }

    static asString() {
        return "Add Inline Form Validation";
    }

    static getClassName() {
        return "AddInlineFormValidationRefactoring";
    }

    getDescription() {
        return "Provide client inline validation to a form. Mandatory fields must be indicated";
    }
}

export default AddInlineFormValidationRefactoring;