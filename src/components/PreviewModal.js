import React from 'react';

class PreviewModal extends React.Component {

    constructor(props) {
        super(props);
        this.targetElementContainer = React.createRef();
        this.optionChange = this.optionChange.bind(this);
    }


    closeModal() {
        document.querySelector("#ux-painter-preview").style.display = "none";
    }

    componentDidMount() {
        this.props.view.setSelectedRefactoring(0);
        this.targetElementContainer.current.appendChild(this.props.targetElements[0]);
        this.activeOption = document.querySelector(".ux-painter-option-list li a");
        this.activeOption.setAttribute("class", "active");
    }

    render() {
        return (
            <div className={"ux-painter-modal-container"}>
                <span className={"ux-painter-modal-close"} onClick={this.closeModal}>&times;</span>
                <div className={"ux-painter-modal-header"}>
                    <h3 className={'ux-painter-modal-title'}>Refactoring Preview</h3>
                    <ul className={'ux-painter-option-list'}>
                        {this.renderOptionList()}
                    </ul>
                </div>
                <div className={"ux-painter-modal-body"}>
                    <div className={"ux-painter-modal-previews"} ref={this.targetElementContainer}>
                    </div>
                </div>
            </div>
        );
    }

    renderOptionList () {
        return this.props.targetElements.map((element, index) => {
            return <li className={'ux-painter-list-element'}><a option-index={index} onClick={this.optionChange}>Option {index + 1}</a></li>
        });
    }

    optionChange(event) {
        const optionIndex = event.target.getAttribute("option-index");
        this.props.view.setSelectedRefactoring(optionIndex);
        this.activeOption.setAttribute("class", "");
        this.activeOption = event.target;
        this.activeOption.setAttribute("class", "active");
        this.targetElementContainer.current.replaceChild(this.props.targetElements[optionIndex], this.targetElementContainer.current.childNodes[0]);
    }
}

export default PreviewModal;