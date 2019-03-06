import React from 'react';

class RadioSet extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleOtherRadio = this.handleOtherRadio.bind(this);
        this.otherFreeInput = React.createRef();
    }

    render () {
        const radioName = this.getRandomID();
        const me = this;
        const radios = this.props.values.map((value, i) => {
            return <p style={{display: me.props.display}}>
                {me.renderRadio(value,radioName, me.props.labelPosition, this.handleChange)}
            </p>
        });

        return (
            <div className={'uxpainter-radio-set'}>
                {radios}
                {this.renderRadio('Other', radioName, this.props.labelPosition, this.handleOtherRadio)}
                <input type={'text'} style={{display:"none"}} onChange={this.handleChange} ref={this.otherFreeInput}/>
            </div>
        )
    }

    renderRadio(value, name, labelPosition, handler) {
        const radioLabel = <label style={{cursor:'pointer'}}>{value}</label>
        const radioInput = <input type={'radio'} value={value} name={name} onChange={handler}/>
        return (labelPosition == "left")? [radioInput,radioLabel]:[radioLabel,radioInput]
    }

    handleChange(event) {
        this.props.refactoring.getElement().value = event.target.value;
        if (event.target.type == "radio") {
            this.otherFreeInput.current.style.display = "none";
        }
    }

    handleOtherRadio() {
        this.props.refactoring.getElement().value = "";
        this.otherFreeInput.current.style.display = "inline";
    }

    getRandomID() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

}

export default RadioSet;