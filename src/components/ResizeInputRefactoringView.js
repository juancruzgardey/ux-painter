import React from 'react';
import RefactoringOnElementView from './RefactoringOnElementView';

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
            <RefactoringOnElementView refactoring={this.refactoring}>
                <div className={'form-group'}>
                    <label>New Input Width (in pixels)</label>
                    <input type={'text'} className={'form-control'} onChange={this.handleChange}/>
                </div>
            </RefactoringOnElementView>
        )
    }

}

export default ResizeInputRefactoringView;