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
        this.previewsQty = 5;
        this.selectedRefactoring = this.refactoring;
    }

    createModal() {
        this.modal = document.createElement("div");
        this.modal.id = "ux-painter-preview";
        this.modal.setAttribute("class", "ux-painter-modal");
        document.body.appendChild(this.modal);
    }

    handleSubmit() {
        this.modal.parentNode.removeChild(this.modal);
        this.selectedRefactoring.setElement(this.originalTargetElement);
        this.selectedRefactoring.execute();
    }

    createPreviews() {
        let previewElements = [];
        this.previewRefactorings = this.refactoring.constructor.getPreviewer().generatePreviews(this.refactoring);
        for (let i = 0; i < this.previewRefactorings.length; i++) {
            this.previewRefactorings[i].execute();
            previewElements.push(this.previewRefactorings[i].targetElementContainer);
        }
        return previewElements;
    }

    handlePreviewClick () {
        this.modal.parentNode.removeChild(this.modal);
        this.createModal();

        const previewElements = this.createPreviews();

        ReactDOM.render(<PreviewModal targetElements={previewElements} view={this}/>, this.modal);
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

    setSelectedRefactoring(anIndex) {
        this.selectedRefactoring = this.previewRefactorings[anIndex];
    }

}

export default RefactoringView;