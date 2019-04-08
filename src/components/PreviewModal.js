import React from 'react';

class PreviewModal extends React.Component {

    constructor(props) {
        super(props);
        this.targetElementContainer = React.createRef();
    }


    closeModal() {
        document.querySelector("#ux-painter-preview").style.display = "none";
    }

    componentDidMount() {
        for (let i = 0; i < this.elementRefs.length; i++) {
            this.elementRefs[i].current.appendChild(this.props.targetElements[i]);
        }
    }

    render() {
        this.elementRefs = [];
        const previewElements = this.props.targetElements.map(element => {
           const elementReference = React.createRef();
           this.elementRefs.push(elementReference);
           return <div className={'uxpainter-preview-item'} ref={elementReference}></div>
        });

        return (
                <div className={"ux-painter-modal-content"} ref={this.targetElementContainer}>
                    <span className={"close"} onClick={this.closeModal}>&times;</span>
                    <h3 className={'ux-painter-modal-title'}>Refactoring Preview</h3>
                    {previewElements}
                </div>
        );
    }
}

export default PreviewModal;