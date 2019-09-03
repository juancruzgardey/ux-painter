import UsabilityRefactoring from "./UsabilityRefactoring";

import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
import 'jquery-ui-bundle/jquery-ui.css';
import DateSelectsIntoDatepickerView from "../components/DateSelectsIntoDatepickerView";
datepickerFactory($);

class DateSelectsIntoDatepickerRefactoring extends UsabilityRefactoring {

    getDaySelect() {
        return this.xpathInterpreter.getSingleElementByXpath(this.daySelectXpath, this.getContext());
    }

    getMonthSelect() {
        return this.xpathInterpreter.getSingleElementByXpath(this.monthSelectXpath, this.getContext());
    }

    getYearSelect() {
        return this.xpathInterpreter.getSingleElementByXpath(this.yearSelectXpath, this.getContext());
    }

    setDaySelectXpath(xpath) {
        this.daySelectXpath = xpath;
    }

    setMonthSelectXpath(xpath) {
        this.monthSelectXpath = xpath;
    }

    setYearSelectXpath(xpath) {
        this.yearSelectXpath = xpath;
    }

    transform () {
        this.getDaySelect().style.display = "none";
        this.getMonthSelect().style.display = "none";
        this.getYearSelect().style.display = "none";

        let textInput = document.createElement("input");
        textInput.type = "text";
        this.getDaySelect().parentNode.insertBefore(textInput, this.getDaySelect());
        const me = this;
        $(textInput).datepicker({
            dateFormat: "dd/mm/yy",
            onSelect: function (date, event) {
                me.updateValue(date);
            }
        });
    }

    updateValue(aDate) {
        const dateArray = aDate.split("/");
        let day = parseInt(dateArray[0]);
        let month = parseInt(dateArray[1]);
        let year = parseInt(dateArray[2]);

        this.getDaySelect().value = this.getDaySelect().options[day].value;
        this.getMonthSelect().value = this.getMonthSelect().options[month].value;
        this.getYearSelect().value = year;

    }

    getSelectionView () {
        return DateSelectsIntoDatepickerView;
    }

    clone(aContext) {
        let clonedRefactoring = super.clone(aContext);
        clonedRefactoring.setDaySelectXpath(this.daySelectXpath);
        clonedRefactoring.setMonthSelectXpath(this.monthSelectXpath);
        clonedRefactoring.setYearSelectXpath(this.yearSelectXpath);
        return clonedRefactoring;
    }

    static asString() {
        return "Date Selects into Datepicker";
    }

    static getClassName() {
        return "DateSelectsIntoDatepickerRefactoring";
    }
}

export default DateSelectsIntoDatepickerRefactoring