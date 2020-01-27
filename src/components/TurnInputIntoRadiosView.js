import RefactoringOnElementView from "./RefactoringOnElementView";
import React from "react";
import RefactoringConfigurationView from "./RefactoringConfigurationView";

class TurnInputIntoRadiosView extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleOptionsDisplay = this.handleOptionsDisplay.bind(this);
        this.handleLabelPosition = this.handleLabelPosition.bind(this);
        this.refactoring = this.props.refactoring;
    }


    handleChange(event) {
        const valuesCollection = event.target.value.split(",");
        this.setState({values: valuesCollection});
        this.refactoring.setValues(valuesCollection);
    }

    handleOptionsDisplay(event) {
        this.setState({"optionsDisplay": event.target.value});
        this.refactoring.setOptionDisplay(event.target.value);
    }

    handleLabelPosition(event) {
        this.setState({"labelPosition": event.target.value});
        this.refactoring.setLabelPosition(event.target.value);
    }

    render () {
        return (
            <RefactoringConfigurationView refactoring={this.refactoring}>
                    <label>Suggested values</label>
                    <input type={'text'} placeholder={'e.g apple,orange,banana'} className={'form-control'} onChange={this.handleChange}/>
                    <span></span>
            </RefactoringConfigurationView>
        )
    }

}

export default TurnInputIntoRadiosView;