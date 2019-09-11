import React from 'react';
import RefactoringConfigurationView from "./RefactoringConfigurationView";

class AddTooltipView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tooltipName: ''};
        this.handleChange = this.handleChange.bind(this);
        this.refactoring = this.props.refactoring;
    }

    handleChange(event) {
        this.setState({tooltipName: event.target.value});
        this.refactoring.setTooltipName(event.target.value);
    }


    render () {
        return (
            <RefactoringConfigurationView refactoring={this.refactoring}>
                <div className={'form-group'}>
                    <label>Tooltip Name</label>
                    <input type={'text'} className={'form-control'} onChange={this.handleChange}/>
                </div>
            </RefactoringConfigurationView>
        )
    }

}

export default AddTooltipView;