import React from 'react';
import RefactoringOnElementView from './RefactoringOnElementView';

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
            <RefactoringOnElementView refactoring={this.refactoring}>
                <div className={'form-group'}>
                    <label>Input Format</label>
                    <input type={'text'} className={'form-control'} onChange={this.handleChange}/>
                </div>
            </RefactoringOnElementView>
        )
    }
}

export default FormatInputView;