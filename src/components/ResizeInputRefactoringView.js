import React from 'react';
import RefactoringConfigurationView from "./RefactoringConfigurationView";

class ResizeInputRefactoringView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {inputWidth: ''};
        this.handleChange = this.handleChange.bind(this);
        this.refactoring = this.props.refactoring;
    }

    handleChange(event) {
        this.setState({inputWidth: event.target.value});
        this.refactoring.setInputWidth(event.target.value);
    }

    render () {
        return (
            <RefactoringConfigurationView refactoring={this.refactoring}>
                <div className={'form-group'}>
                    <label>New Input Width (in pixels)</label>
                    <input type={'text'} className={'form-control'} onChange={this.handleChange}/>
                </div>
            </RefactoringConfigurationView>
        )
    }

}

export default ResizeInputRefactoringView;