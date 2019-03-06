import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement';
import ReactDOM from "react-dom";
import React from 'react';
import RadioSet from "../components/RadioSet";
import TurnInputIntoRadiosView from "../components/TurnInputIntoRadiosView";

class TurnInputIntoRadiosRefactoring extends UsabilityRefactoringOnElement {

    setValues(values) {
        this.values = values;
    }

    targetElements = function () {
        return "input[type='text']";
    };

    transform () {
        this.getElement().setAttribute("type", "hidden");
        const div = document.createElement("div");
        this.getElement().parentNode.appendChild(div);
        ReactDOM.render(<RadioSet values={this.values} refactoring={this} display={this.optionDisplay} labelPosition={this.labelPosition}/>, div);
    }

    getView() {
        return TurnInputIntoRadiosView;
    }

    setLabelPosition(aString) {
        this.labelPosition = aString;
    }

    setOptionDisplay(aString) {
        this.optionDisplay = aString;
    }

    static asString () {
        return "Turn Input into Radios";
    }

}

export default TurnInputIntoRadiosRefactoring;








