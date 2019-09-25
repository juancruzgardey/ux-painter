
import AddAutocompleteRefactoring from "./AddAutocompleteRefactoring";

class TurnSelectIntoAutocompleteRefactoring extends AddAutocompleteRefactoring {

    constructor() {
        super();
    }

    hasSelectInputTarget() {
        return true;
    }

    setElement(anElement) {
        this.targetElement = anElement;
        this.values = Array.from(this.targetElement.options).map(option => {
            return option.label;
        });
    }

    setAutocompleteInput() {
        this.autocompleteInput = this.replaceSelectWithTextInput();
        this.applyStyles([this.autocompleteInput], this.getStyle().textInput);
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

    unDo() {
        super.unDo();
        this.getElement().style.display = "";
        this.autocompleteInput.parentNode.removeChild(this.autocompleteInput);
    }

    targetElements() {
        return "select";
    }

    getDescription() {
        return "Select field is turned into a text field in which the select options are suggested as the user types";
    }

    static asString() {
        return "Turn Select into Autocomplete";
    }

    static getClassName() {
        return "TurnSelectIntoAutocompleteRefactoring";
    }

}

export default TurnSelectIntoAutocompleteRefactoring;