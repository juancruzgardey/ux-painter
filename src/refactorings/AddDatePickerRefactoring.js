import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import RefactoringOnElementView from "../components/RefactoringOnElementView";


import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
import 'jquery-ui-bundle/jquery-ui.css';

datepickerFactory($);

class AddDatePickerRefactoring extends UsabilityRefactoringOnElement {

    transformElement(anElement) {
        $(anElement).datepicker({ dateFormat: "d/m/y" });
    }

    previewOnElement(anElement) {
        this.transformElement(anElement);
        const me = this;
    }

    transform () {
        this.transformElement(this.getElement());
        this.styleScrapped = false;
        const me = this;
        this.getElement().addEventListener("focus", function () {
            if (!this.styleScrapped) {
                me.scrapStyles();
                this.styleScrapped = true;
            }
            me.applyStyles();
        });


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
        return document.querySelectorAll(".ui-datepicker-header");
    }

    getHeaderElements() {
        return document.querySelectorAll("table.ui-datepicker-calendar > thead > tr > th");
    }

    getSelectableElements() {
        return document.querySelectorAll("table.ui-datepicker-calendar > tbody > tr > td > a");
    }

    getDatePickerTable() {
        return document.querySelectorAll("table.ui-datepicker-calendar");
    }

    scrapStyles () {
        this.styles = [];
        const headerStyle = this.getStyleScrapper().getRandomStyle(this.getElement());
        this.styles.push({element: "getDatePickerTitle", style: headerStyle});

        // selectable elements style
        const selectableElementStyle = this.getStyleScrapper().getRandomStyle(this.getElement());
        this.styles.push({element: "getSelectableElements", style: selectableElementStyle});

        // table style
        const tableStyle = this.getStyleScrapper().getRandomStyle(this.getElement());
        this.styles.push({element: "getDatePickerTable", style: {"background-color": tableStyle["background-color"]}});

        this.styles.push({element: "getHeaderElements", style: {"color": tableStyle.color}});
    }
}

export default AddDatePickerRefactoring;