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

    targetElements = function () {
        return "input[type='text']";
    };

    transform () {
        this.getElement().setAttribute("type", "hidden");
        const div = document.createElement("div");
        this.getElement().parentNode.appendChild(div);
        ReactDOM.render(<RadioSet values={this.values} refactoring={this}/>,div);
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

    setDisplayStyle(aString) {
        this.displayStyle = aString;
    }

    getDisplayStyle() {
        return this.displayStyle;
    }

    setLabelsPosition(aString) {
        this.labelsPosition = aString;
    }

    getLabelsPosition() {
        return this.labelsPosition;
    }

    clone() {
        let refactoring = super.clone();
        refactoring.setValues(this.values);
        return refactoring;
    }

}

export default TurnInputIntoRadiosRefactoring;








