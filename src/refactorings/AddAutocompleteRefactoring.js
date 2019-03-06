import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import TurnInputIntoRadiosRefactoring from "./TurnInputIntoRadiosRefactoring";

import Awesomplete from 'awesomplete/awesomplete';
import 'awesomplete/awesomplete.css';
import TurnInputIntoRadiosView from "../components/TurnInputIntoRadiosView";

class AddAutocompleteRefactoring extends UsabilityRefactoringOnElement {

    transform(){
        new Awesomplete(this.getElement(), {list: this.values});
    }

    setValues(aList) {
        this.values = aList;
    }

    getView() {
        return TurnInputIntoRadiosView;
    }

    static asString() {
        return "Add Autocomplete";
    }

    targetElements() {
        return "input[type='text']";
    }


};

export default AddAutocompleteRefactoring;

