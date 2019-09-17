import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import XPathInterpreter from './XPathInterpreter';
import Awesomplete from 'awesomplete/awesomplete';
import 'awesomplete/awesomplete.css';
import TurnInputIntoRadiosView from "../components/TurnInputIntoRadiosView";
import ColorPreviewer from "../previewers/ColorPreviewer";

class AddAutocompleteRefactoring extends UsabilityRefactoringOnElement {

    constructor() {
        super();
    }

    setElement(anElement) {
        this.targetElement = anElement;
        if (this.targetElement.tagName == "SELECT") {
            this.values = Array.from(this.targetElement.options).map(option => {
                return option.label;
            });
        }
    }

    transform() {
        let updateInputStyle = false;
        if (this.getElement().tagName == "INPUT") {
            this.autocompleteInput = this.getElement();
            updateInputStyle = true;
        }
        else {
            this.autocompleteInput = this.replaceSelectWithTextInput();
        }
        this.awesomplete = new Awesomplete(this.autocompleteInput, {list: this.values});
        if (updateInputStyle) {
            this.getStyleScrapper().updateElementStyle(this.getElement(), this.getStyleScrapper().getElementComputedStyle(this.getElementXpath()));
        }
        const me = this;
        this.autocompleteInput.addEventListener("keyup", function () {
            me.applyStyles(me.getHighlightedElements(), me.getStyle().highlightedElements);
        });
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
        return "input[type='text'], select";
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
        return new ColorPreviewer();
    }

    static getClassName() {
        return "AddAutocompleteRefactoring";
    }
};

export default AddAutocompleteRefactoring;

