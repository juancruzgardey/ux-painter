import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";

import Awesomplete from 'awesomplete/awesomplete';
import 'awesomplete/awesomplete.css';
import TurnInputIntoRadiosView from "../components/TurnInputIntoRadiosView";
import AddDatepickerPreviewer from "../previewers/AddDatepickerPreviewer";

class AddAutocompleteRefactoring extends UsabilityRefactoringOnElement {

    constructor() {
        super();
    }

    transform() {
        const originalStyle = this.getStyleScrapper().getElementComputedStyle(this.getElement());
        new Awesomplete(this.getElement(), {list: this.values});
        this.getStyleScrapper().updateElementStyle(this.getElement(), originalStyle);
        const me = this;
        this.getElement().addEventListener("keyup", function () {
          me.applyStyles();
        });
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
        return document.querySelectorAll("#" + this.getElement().getAttribute("aria-owns"));
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

    setStyles(styles) {
        this.styles = [];
        this.styles.push({element: "getHighlightedElements", style: styles[0]});
    }

    clone() {
        let clonedRefactoring = super.clone();
        clonedRefactoring.setValues(this.getValues());
        return clonedRefactoring;
    }

    static getPreviewer() {
        return new AddDatepickerPreviewer();
    }
};

export default AddAutocompleteRefactoring;

