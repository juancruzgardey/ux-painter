import $ from 'jquery';
import 'jquery-datepicker/date-dropdowns';
import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';
import RefactoringOnElementView from "../components/RefactoringOnElementView";

class DateInputIntoSelectsRefactoring extends UsabilityRefactoringOnElement {

    transform = function () {
        var dateInput = $(this.getElement());
        if (typeof(dateInput[0]) != "undefined") {
            var submitFieldName = dateInput.attr("name");
            dateInput.attr("name", "");
            dateInput.dateDropdowns({submitFieldName: submitFieldName});
        }
    }

    getView() {
        return RefactoringOnElementView;
    }

    static asString() {
        return "Date Input into Selects";
    }

    targetElements() {
        return "input[type='text']";
    }

}

export default DateInputIntoSelectsRefactoring;




