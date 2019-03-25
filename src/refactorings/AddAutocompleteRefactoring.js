import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";

import Awesomplete from 'awesomplete/awesomplete';
import 'awesomplete/awesomplete.css';
import TurnInputIntoRadiosView from "../components/TurnInputIntoRadiosView";

class AddAutocompleteRefactoring extends UsabilityRefactoringOnElement {

    constructor() {
        super();
    }

    transform() {
        const originalStyle = this.getStyleScrapper().getElementComputedStyle(this.getElement());
        new Awesomplete(this.getElement(), {list: this.values});
        this.getStyleScrapper().updateElementStyle(this.getElement(), originalStyle);
        this.applyStyles();
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


    getAutocompleteList() {
        return document.querySelector("#" + this.getElement().getAttribute("aria-owns"));
    }

    getAutocompleteListElements() {
        return this.getAutocompleteList().querySelectorAll("li");
    }

    getHighlightedElements(listElement) {
        return listElement.querySelectorAll("mark");
    }

    applyStyles() {
        const basicStyle = this.getStyleScrapper().getLeafElementsByDistance(this.getElement())[1];
        const highlightedItemStyle = this.getStyleScrapper().getLeafElementsByDistance(this.getElement())[0];

        this.getAutocompleteList().style.backgroundColor = basicStyle.backgroundColor;

        const me = this;
        this.getElement().addEventListener("keyup", function () {
            let listElements = me.getAutocompleteListElements();
            if (!listElements) {
                return
            }
            for (let i = 0; i < listElements.length; i++) {
                // font color of list item
                listElements[i].style.color = basicStyle.color;

                //highlighted strings styles
                const highlightedElements = me.getHighlightedElements(listElements[i]);
                for (let j = 0; j < highlightedElements.length; j++) {
                    highlightedElements[j].style.backgroundColor = highlightedItemStyle.backgroundColor;
                    highlightedElements[j].style.color = highlightedItemStyle.color;
                }
            }
        });
    }
};

export default AddAutocompleteRefactoring;

