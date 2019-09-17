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
        return this.targetElement.tagName == "SELECT";
    }

    setElement(anElement) {
        this.targetElement = anElement;
        if (this.hasSelectInputTarget()) {
            this.values = Array.from(this.targetElement.options).map(option => {
                return option.label;
            });
        }
    }

    transform() {
        let updateInputStyle = null;
        if (this.getElement().tagName == "INPUT") {
            this.autocompleteInput = this.getElement();
            updateInputStyle = this.getStyleScrapper().getElementComputedStyle(this.getElementXpath());
        }
        else {
            this.autocompleteInput = this.replaceSelectWithTextInput();
            this.applyStyles([this.autocompleteInput], this.getStyle().textInput);
        }
        this.awesomplete = new Awesomplete(this.autocompleteInput, {list: this.values});
        if (updateInputStyle) {
            this.getStyleScrapper().updateElementStyle(this.getElement(), updateInputStyle);
        }
        const me = this;
        this.autocompleteInput.addEventListener("keyup", this.onKeyUp);
    }

    onKeyUp() {
        this.applyStyles(this.getHighlightedElements(), this.getStyle().highlightedElements);
    }

    replaceSelectWithTextInput() {
        this.getElement().style.display = "none";
        let textInput = document.createElement("input");
        textInput.type = "text";
        this.getElement().parentNode.insertBefore(textInput, this.getElement());
        const me = this;
        textInput.addEventListener("awesomplete-selectcomplete", function (event) {
            me.getElement().selectedIndex = me.getValues().indexOf(event.text.value);
        });
        return textInput;
    }

    checkPreconditions() {
        return super.checkPreconditions() && this.values && this.values.length > 0;
    }

    unDo() {
        this.autocompleteInput.removeEventListener("keyup", this.onKeyUp);
        this.awesomplete.destroy();
        if (this.hasSelectInputTarget()) {
            this.getElement().style.display = "";
            this.autocompleteInput.parentNode.removeChild(this.autocompleteInput);
        }
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
        return "input[type='text'], select";
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
};

export default AddAutocompleteRefactoring;

