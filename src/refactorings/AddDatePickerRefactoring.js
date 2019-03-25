import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import RefactoringOnElementView from "../components/RefactoringOnElementView";


import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
import 'jquery-ui-bundle/jquery-ui.css';

datepickerFactory($);

class AddDatePickerRefactoring extends UsabilityRefactoringOnElement {

    transform () {
        $(this.getElement()).datepicker({ dateFormat: "d/m/y" });

        const me = this;
        this.getElement().addEventListener("focus", function () {
            me.applyStyles();
        })
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

    getDatePickerTitle() {
        return document.querySelector(".ui-datepicker-header");
    }

    getHeaderElements() {
        return document.querySelectorAll("table.ui-datepicker-calendar > thead > tr > th");
    }

    getSelectableElements() {
        return document.querySelectorAll("table.ui-datepicker-calendar > tbody > tr > td > a");
    }

    getDatePickerTable() {
        return document.querySelector("table.ui-datepicker-calendar");
    }

    applyStyles () {
        const headerStyle = this.getStyleScrapper().getRandomStyle(this.getElement());
        this.getDatePickerTitle().style.color = headerStyle.color;
        this.getDatePickerTitle().style.backgroundColor = headerStyle.backgroundColor;

        // selectable elements style
        const selectableElementStyle = this.getStyleScrapper().getRandomStyle(this.getElement());
        const selectableElements = this.getSelectableElements();
        for (let i = 0; i < selectableElements.length; i++) {
            selectableElements[i].style.color = selectableElementStyle.color;
            selectableElements[i].style.backgroundColor = selectableElementStyle.backgroundColor;
        }

        // table style
        const tableStyle = this.getStyleScrapper().getRandomStyle(this.getElement());
        this.getDatePickerTable().style.backgroundColor = tableStyle.backgroundColor;
        const headerElements = this.getHeaderElements();
        for (let i = 0; i < headerElements.length; i++) {
            headerElements[i].style.color = tableStyle.color;
        }

    }

}

export default AddDatePickerRefactoring;