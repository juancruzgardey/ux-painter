import React from 'react';
import RefactoringConfigurationView from "./RefactoringConfigurationView";

class RenameElementView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {elementName: ''};
        this.handleChange = this.handleChange.bind(this);
        this.refactoring = this.props.refactoring;
    }

    handleChange(event) {
        this.setState({elementName: event.target.value});
        this.refactoring.setNewName(event.target.value);
    }


    render () {
        return (
            <RefactoringConfigurationView refactoring={this.refactoring}>
                <div className={'form-group'}>
                    <label>Element Name</label>
                    <input type={'text'} className={'form-control'} id={'uxpainter-element-name'} onChange={this.handleChange}/>
                </div>
            </RefactoringConfigurationView>
        )
    }

}

export default RenameElementView;