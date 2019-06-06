import React from 'react';
import ReactDOM from "react-dom";

import { Link, goBack } from 'route-lite';
import RefactoringListView from "./RefactoringListView";
import PreviewModal from "./PreviewModal";
import StyleScrapper from "../scrappers/StyleScrapper";

class RefactoringView extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePreviewClick = this.handlePreviewClick.bind(this);
        this.originalTargetElement = this.refactoring.getElement();
        this.originalTargetElement.setAttribute("data-uxpainter-id", Math.random().toString(36).substring(2, 15));
        this.createModal();
    }

    createModal() {
        this.modal = document.createElement("div");
        this.modal.id = "ux-painter-preview";
        this.modal.setAttribute("class", "ux-painter-modal");
        document.body.appendChild(this.modal);
    }

    handleSubmit() {
        //this.refactoring.setElement(this.originalTargetElement);
        this.refactoring.execute();
    }

    createPreviews() {
        let previewElements = [];
        let styleScrapper = new StyleScrapper();
        styleScrapper.scrapStyles(this.originalTargetElement,3,10);
        for (let i = 0; i < 10; i++) {
            const targetElementParent = this.originalTargetElement.parentNode.cloneNode(true);
            // executes the refactoring on the cloned element
            let targetElement = targetElementParent.querySelector("[data-uxpainter-id='" +  this.originalTargetElement.getAttribute("data-uxpainter-id") + "']");
            let previewRefactoring = this.refactoring.clone();
            previewRefactoring.setElement(targetElement);
            previewRefactoring.setStyleScrapper(styleScrapper);
            previewRefactoring.execute();
            previewElements.push(targetElementParent);
        }
        return previewElements;
    }

    handlePreviewClick () {
        this.modal.parentNode.removeChild(this.modal);
        this.createModal();

        const previewElements = this.createPreviews();

        ReactDOM.render(<PreviewModal targetElements={previewElements}/>, this.modal);
        this.modal.style.display = "block";
    }

    render () {
        const refactoringUrl = document.location.href.replace(document.location.search, "");
        return (
            <div className={"row"}>
                <div className={'col-md-12'}>
                    <h2>{this.refactoring.constructor.asString()}</h2>
                    <input type={'hidden'} id={'url_for_instance'} value={refactoringUrl}/>
                    {this.props.children}
                    <div className={'form-group'}>
                            <Link className={'btn btn-warning inline-link'} onClick={this.handleSubmit} component={RefactoringListView}>Refactor</Link>
                            <Link className={'btn btn-dark inline-link'}  onClick={this.handlePreviewClick}>Preview</Link>
                    </div>
                    <div className={'form-group'}>
                        <Link className={'btn btn-secondary'} onClick={() => goBack()}>Back</Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default RefactoringView;