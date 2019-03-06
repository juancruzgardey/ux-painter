import React from 'react';
import RefactoringOnElementView from './RefactoringOnElementView';

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
            <RefactoringOnElementView refactoring={this.refactoring}>
                <div className={'ux-painter-form-group'}>
                    <label>Tooltip Name</label>
                    <input type={'text'} onChange={this.handleChange}/>
                </div>
            </RefactoringOnElementView>
        )
    }

}

export default AddTooltipView;