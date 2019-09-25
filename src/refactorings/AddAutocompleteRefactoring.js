import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import Awesomplete from 'awesomplete/awesomplete';
import 'awesomplete/awesomplete.css';
import TurnInputIntoRadiosView from "../components/TurnInputIntoRadiosView";
import AddAutocompletePreviewer from "../previewers/AddAutocompletePreviewer";

class AddAutocompleteRefactoring extends UsabilityRefactoringOnElement {

    constructor() {
        super();
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    hasSelectInputTarget() {
        return false;
    }

    setAutocompleteInput() {
        this.autocompleteInput = this.getElement();
    }

    transform() {
        this.setAutocompleteInput();
        let originalInputStyle = this.getStyleScrapper().getElementComputedStyle(this.autocompleteInput);
        this.awesomplete = new Awesomplete(this.autocompleteInput, {list: this.values});
        this.getStyleScrapper().updateElementStyle(this.autocompleteInput, originalInputStyle);
        this.autocompleteInput.addEventListener("keyup", this.onKeyUp);
    }

    onKeyUp() {
        this.applyStyles(this.getHighlightedElements(), this.getStyle().highlightedElements);
    }

    checkPreconditions() {
        return super.checkPreconditions() && this.values && this.values.length > 0;
    }

    unDo() {
        this.autocompleteInput.removeEventListener("keyup", this.onKeyUp);
        this.awesomplete.destroy();
    }

    setValues(aList) {
        this.values = aList;
    }

    getValues() {
        return this.values;
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


    getAutocompleteList() {
        return document.querySelectorAll("#" + this.autocompleteInput.getAttribute("aria-owns"));
    }

    getAutocompleteListElements() {
        return this.getAutocompleteList()[0].querySelectorAll("li");
    }

    getHighlightedElements() {
        return this.getAutocompleteList()[0].querySelectorAll("mark");
    }

    getStyledElementsQty () {
        return  1;
    }

    assignStyle(styles) {
        this.getStyle()["highlightedElements"] = styles[0];
    }

    clone() {
        let clonedRefactoring = super.clone();
        clonedRefactoring.setValues(this.getValues());
        return clonedRefactoring;
    }

    serialize() {
        let json = super.serialize();
        json.values = this.getValues();
        return json;
    }

    static getPreviewer() {
        return new AddAutocompletePreviewer();
    }

    static getClassName() {
        return "AddAutocompleteRefactoring";
    }

    getDescription() {
        return "Possible values to an input are suggested automatically when users complete it";
    }

    getDemoResources() {
        return ["AddAutocompleteRefactoringBefore.gif", "AddAutocompleteRefactoringAfter.gif"];
    }
};

export default AddAutocompleteRefactoring;

