import React from 'react';

class PreviewModal extends React.Component {

    constructor(props) {
        super(props);
        this.targetElementContainer = React.createRef();
        this.state = {targetElement: this.props.targetElement};
    }


    closeModal() {
        document.querySelector("#ux-painter-preview").style.display = "none";
    }

    componentDidMount() {
        this.targetElementContainer.current.appendChild(this.state.targetElement);
    }

    render() {
        return (
                <div className={"ux-painter-modal-content"} ref={this.targetElementContainer}>
                    <span className={"close"} onClick={this.closeModal}>&times;</span>
                    <h3 className={'ux-painter-modal-title'}>Refactoring Preview</h3>
                </div>
        );
    }
}

export default PreviewModal;