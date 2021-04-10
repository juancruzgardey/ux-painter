import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask';
import FormatInputView from "../components/FormatInputView";

class FormatInputRefactoring extends UsabilityRefactoringOnElement {

    constructor() {
        super();
    }

    setFormatString(aString) {
        this.formatString = aString;
    }

    getFormatString() {
        return this.formatString;
    }

    checkPreconditions () {
        return super.checkPreconditions() && this.getFormatString();
    }

    transform() {
        const me = this;
        $(this.getElement()).mask(this.getFormatString(), {
            placeholder: me.getPlaceholder()
        });
    }

    unDo() {
        $(this.getElement()).unmask();
    }

    targetElements() {
        return "input[type='text']";
    }

    getView() {
        return FormatInputView;
    }

    getPlaceholder() {
        let placeholder = "";
        for (let i = 0; i < this.getFormatString().length; i++) {
            if (["0","9","A","S"].indexOf(this.getFormatString()[i]) != -1) {
                placeholder += "_";
            }
            else {
                placeholder += this.getFormatString()[i];
            }
        }
        return placeholder;
    }

    clone(aContext) {
        let clonedRefactoring = super.clone(aContext);
        clonedRefactoring.setFormatString(this.getFormatString());
        return clonedRefactoring;
    }

    serialize() {
        let json = super.serialize();
        json.formatString = this.getFormatString();
        return json;
    }

    static asString() {
        return "Format Input";
    }

    static getClassName() {
        return "FormatInputRefactoring";
    }

    getDescription() {
        return "Add a mask to a text field in order to limit the input to a certain characters";
    }

    //

    imports() {
        return ["import $ from 'jquery';\n","import 'jquery-mask-plugin/dist/jquery.mask.min';\n"]
    }

    mounts(elementWord, randomInt) {
        return ["$('#" + elementWord + randomInt.toString() + "').mask('" + this.getFormatString() + "');\n"]
    }
    
    codeAvaiable() {
        return true
    }

}

export default FormatInputRefactoring;