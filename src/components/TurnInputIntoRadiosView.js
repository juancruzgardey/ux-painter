import RefactoringOnElementView from "./RefactoringOnElementView";
import React from "react";

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
            <RefactoringOnElementView refactoring={this.refactoring}>
                <div className={'ux-painter-form-group'}>
                    <label>Values</label>
                    <input type={'text'} onChange={this.handleChange}/>
                </div>
                <div className={'ux-painter-form-group'}>
                    <p><label>Options Inline</label> <input type={'radio'} value={'inline-block'} name={'options_display'} onChange={this.handleOptionsDisplay}/></p>
                    <p><label>Options in Block</label> <input type={'radio'} checked={true} value={'block'} name={'options_display'} onChange={this.handleOptionsDisplay}/></p>
                </div>
                <div className={'ux-painter-form-group'}>
                    <p><label>Labels on the left</label> <input type={'radio'} value={'left'} name={'label_position'} onChange={this.handleLabelPosition}/></p>
                    <p><label>Labels on the right</label> <input type={'radio'} value={'right'} checked={true} name={'label_position'} onChange={this.handleLabelPosition}/></p>
                </div>
            </RefactoringOnElementView>
        )
    }

}

export default TurnInputIntoRadiosView;