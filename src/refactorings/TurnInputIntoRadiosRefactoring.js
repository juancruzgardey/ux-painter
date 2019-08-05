import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';
import ReactDOM from "react-dom";
import React from 'react';
import RadioSet from "../components/RadioSet";
import TurnInputIntoRadiosView from "../components/TurnInputIntoRadiosView";
import TurnInputIntoRadiosPreviewer from "../previewers/TurnInputIntoRadiosPreviewer";

class TurnInputIntoRadiosRefactoring extends UsabilityRefactoringOnElement {

    setValues(values) {
        this.values = values;
    }

    getValues() {
        return this.values;
    }

    targetElements = function () {
        return "input[type='text']";
    };

    transform () {
        this.getElement().setAttribute("type", "hidden");
        const radioSetContainer = document.createElement("div");
        this.getElement().parentNode.insertBefore(radioSetContainer, this.getElement());
        ReactDOM.render(<RadioSet values={this.getValues()} refactoring={this}/>,radioSetContainer);
    }

    getView() {
        return TurnInputIntoRadiosView;
    }

    static asString () {
        return "Turn Input into Radios";
    }

    static getPreviewer() {
        return new TurnInputIntoRadiosPreviewer();
    }

    setItemStyle(aString) {
        this.getStyle().item = aString;
    }

    getItemStyle() {
        return this.getStyle().item;
    }

    setLabelsPosition(aString) {
        this.getStyle().labelsPosition = aString;
    }

    getLabelsPosition() {
        return this.getStyle().labelsPosition;
    }

    setLabelsStyle(aStyle) {
        this.getStyle().labels = aStyle;
    }

    getLabelsStyle() {
        if (!this.getStyle().labels) {
            return {};
        }
        return this.getStyle().labels;
    }

    getOtherInputStyle() {
        if (!this.getStyle().otherInput) {
            return {};
        }
        return this.getStyle().otherInput;
    }

    setOtherInputStyle(style) {
        this.getStyle().otherInput = style;
    }

    clone() {
        let refactoring = super.clone();
        refactoring.setValues(this.getValues());
        return refactoring;
    }

    serialize() {
        let json = super.serialize();
        json.values = this.getValues();
        return json;
    }

    static getClassName() {
        return "TurnInputIntoRadiosRefactoring";
    }

}

export default TurnInputIntoRadiosRefactoring;








