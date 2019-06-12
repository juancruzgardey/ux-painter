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
            let input = <input type={'radio'} value={value} name={radioName} onChange={me.handleChange}/>;
            let label = <label style={{cursor:'pointer'}}>{value}</label>;
            return <p style={{display: me.props.refactoring.getDisplayStyle()}}>
                {this.renderRadioItem(input,label)}
            </p>
        });

        const otherInput = <input type={'radio'} value={'Other'} name={radioName} onChange={this.handleOtherRadio}/>;
        const otherLabel = <label style={{cursor:'pointer'}}>Other</label>;

        return (
            <div className={'uxpainter-radio-set'}>
                {radios}
                <p style={{display: me.props.refactoring.getDisplayStyle()}}>
                    {this.renderRadioItem(otherInput,otherLabel)}
                    <input type={'text'} style={{display:"none"}} onChange={this.handleChange} ref={this.otherFreeInput}/>
                </p>
            </div>
        )
    }

    renderRadioItem(input, label) {
        return this.props.refactoring.getLabelsPosition() == "left"?[label,input]:[input,label];
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