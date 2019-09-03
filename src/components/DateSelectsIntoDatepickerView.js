import React from 'react';
import RefactoringView from "./RefactoringView";
import PageSelector from "../PageSelector";
import XPathInterpreter from "../refactorings/XPathInterpreter";


class DateSelectsIntoDatepickerView extends React.Component {

    constructor(props) {
        super(props);
        this.pageSelector = new PageSelector(this);
        this.xpathInterpreter = new XPathInterpreter();
        this.state = {
            selectingDay: false,
            selectingMonth: false,
            selectingYear: false
        }

        this.enableDaySelectSelection = this.enableDaySelectSelection.bind(this);
        this.enableMonthSelectSelection = this.enableMonthSelectSelection.bind(this);
        this.enableYearSelectSelection = this.enableYearSelectSelection.bind(this);
    }

    enableElementSelection(selector, callback) {
        this.pageSelector.enableElementSelection({
            "scrapperClass": "QuerySelectorScrapper",
            "targetElementSelector": selector,
            "onElementSelection": "onElementSelection",
            "justFullPath": true,
            "componentCallback": callback
        });
        this.pageSelector.preventDomElementsBehaviour();
    }

    enableDaySelectSelection() {
        this.setState({selectingDay: true});
        this.enableElementSelection("select", "onDaySelectSelected");
    }

    enableMonthSelectSelection() {
        this.setState({selectingMonth: true});
        this.enableElementSelection("select", "onMonthSelectSelected");
    }

    enableYearSelectSelection() {
        this.setState({selectingYear: true});
        this.enableElementSelection("select", "onYearSelectSelected");
    }

    onDaySelectSelected(anElement) {
        this.props.refactoring.setDaySelectXpath( this.xpathInterpreter.getPath(anElement, this.props.refactoring.getContext())[0]);
        this.setState({selectingDay: false});
        this.pageSelector.addSelectionClass(anElement);
        this.pageSelector.restoreDomElementsBehaviour();
    }

    onMonthSelectSelected(anElement) {
        this.props.refactoring.setMonthSelectXpath( this.xpathInterpreter.getPath(anElement, this.props.refactoring.getContext())[0]);
        this.setState({selectingMonth: false});
        this.pageSelector.addSelectionClass(anElement, this.pageSelector.secondarySelectionClass);
        this.pageSelector.restoreDomElementsBehaviour();
    }

    onYearSelectSelected(anElement) {
        this.props.refactoring.setYearSelectXpath( this.xpathInterpreter.getPath(anElement, this.props.refactoring.getContext())[0]);
        this.setState({selectingYear: false});
        this.pageSelector.addSelectionClass(anElement);
        this.pageSelector.restoreDomElementsBehaviour();
    }

    render() {
        return (
            <RefactoringView refactoring={this.props.refactoring}>
                <div className={'form-group'}>
                    <p>Day Select</p>
                    {this.state.selectingDay && (<span className={'uxpainter-message'}>Select the Day Select</span>)}
                    {!this.state.selectingDay &&
                    (<a className={'btn btn-link'} onClick={this.enableDaySelectSelection}>Select</a>)}
                </div>
                <div className={'form-group'}>
                    <p>Month Select</p>
                    {this.state.selectingMonth && (<span className={'uxpainter-message'}>Select the Month Select</span>)}
                    {!this.state.selectingMonth &&
                    (<a className={'btn btn-link'} onClick={this.enableMonthSelectSelection}>Select</a>)}
                </div>
                <div className={'form-group'}>
                    <p>Year Select</p>
                    {this.state.selectingYear && (<span className={'uxpainter-message'}>Select the Year Select</span>)}
                    {!this.state.selectingYear &&
                    (<a className={'btn btn-link'} onClick={this.enableYearSelectSelection}>Select</a>)}
                </div>

            </RefactoringView>
        )
    }
}

export default DateSelectsIntoDatepickerView