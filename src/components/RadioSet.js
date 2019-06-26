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

        let labelsStyle = this.props.refactoring.getLabelsStyle();
        labelsStyle.cursor = "pointer";
        labelsStyle.display = "inline";

        const radios = this.props.values.map((value, i) => {
            let input = <input type={'radio'} value={value} name={radioName} onChange={me.handleChange}/>;
            let label = <label style={labelsStyle}>{value}</label>;
            return <p style={me.props.refactoring.getItemStyle()}>
                {this.renderRadioItem(input,label)}
            </p>
        });

        const otherInput = <input type={'radio'} value={'Other'} name={radioName} onChange={this.handleOtherRadio}/>;
        const otherLabel = <label style={labelsStyle}>Other</label>;

        let otherInputStyle = this.props.refactoring.getOtherInputStyle();
        otherInputStyle.display = "none";
        otherInputStyle["margin-left"] = "5px";
        return (
            <div className={'uxpainter-radio-set'}>
                {radios}
                <p style={me.props.refactoring.getItemStyle()}>
                    {this.renderRadioItem(otherInput,otherLabel)}
                    <input type={'text'} style={otherInputStyle} placeholder={'Enter new value'} onChange={this.handleChange} ref={this.otherFreeInput}/>
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