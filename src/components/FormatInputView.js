import React from 'react';
import RefactoringOnElementView from './RefactoringOnElementView';
import RefactoringConfigurationView from "./RefactoringConfigurationView";

class FormatInputView extends React.Component {

    constructor (props) {
        super(props);
        this.refactoring = this.props.refactoring;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.refactoring.setFormatString(event.target.value);
    }

    render () {
        return (
            <RefactoringConfigurationView refactoring={this.refactoring}>
                <div className={'form-group'}>
                    <label>Input Format</label>
                    <input type={'text'} className={'form-control'} onChange={this.handleChange}/>
                </div>
                <div className={"form-group"}>
                    <ul>
                        <li>0: allows a number</li>
                        <li>S: allows a letter</li>
                        <li>A: allows a number or a letter</li>
                    </ul>
                    <p>E.g 00/00/0000 for a date DD/MM/YYYY</p>
                </div>
            </RefactoringConfigurationView>
        )
    }
}

export default FormatInputView;