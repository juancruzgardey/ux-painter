import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import RefactoringOnElementView from "../components/RefactoringOnElementView";


import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
import 'jquery-ui-bundle/jquery-ui.css';

datepickerFactory($);

class AddDatePickerRefactoring extends UsabilityRefactoringOnElement {

    transform () {
        $(this.getElement()).datepicker({ dateFormat: "d/m/y" });
    }

    targetElements () {
        return "input[type='text']";
    }

    getView() {
        return RefactoringOnElementView;
    }

    static asString() {
        return "Add DatePicker";
    }

}

export default AddDatePickerRefactoring;