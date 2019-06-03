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

    setStyles(styles) {
        this.styles = [];

        const basicStyle = this.getStyleScrapper().getRandomStyle(this.getElement());
        const highlightedItemStyle = this.getStyleScrapper().getRandomStyle(this.getElement());

        this.styles.push({element: "getAutocompleteList", style: {"background-color": styles[0].backgroundColor}});

        //const me = this;

        this.styles.push({element: "getAutocompleteListElements", style:{"color": styles[0].color}});
        this.styles.push({element: "getHighlightedElements", style: styles[1]});
        /*
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
        */
    }

    clone() {
        let clonedRefactoring = super.clone();
        clonedRefactoring.setValues(this.getValues());
        return clonedRefactoring;
    }
};

export default AddAutocompleteRefactoring;

