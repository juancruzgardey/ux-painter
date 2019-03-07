import React from 'react';
import RefactoringOnElementView from './RefactoringOnElementView';

class RenameElementView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {elementName: ''};
        this.handleChange = this.handleChange.bind(this);
        this.refactoring = this.props.refactoring;
    }

    handleChange(event) {
        this.setState({elementName: event.target.value});
        this.refactoring.setNewName(this.state.elementName);
    }


    render () {
        return (
            <RefactoringOnElementView refactoring={this.refactoring}>
                <div className={'form-group'}>
                    <label>Element Name</label>
                    <input type={'text'} className={'form-control'} id={'uxpainter-element-name'} onChange={this.handleChange}/>
                </div>
            </RefactoringOnElementView>
        )
    }

}

export default RenameElementView;