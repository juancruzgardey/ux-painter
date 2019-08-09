import React from 'react';
import ReactDOM from "react-dom";

import { Link, goBack } from 'route-lite';
import RefactoringListView from "./RefactoringListView";
import PreviewModal from "./PreviewModal";

class RefactoringView extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePreviewClick = this.handlePreviewClick.bind(this);
        this.createModal();
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
        this.refactoring.setStyle(this.selectedRefactoring.getStyle());
        this.refactoring.setURL(document.location.href.replace(document.location.search, ""));
        this.refactoring.execute();
        window.refactoringManager.getCurrentVersion().addRefactoring(this.refactoring);
    }

    createPreviews() {
        let previewElements = [];
        this.previewRefactorings = this.refactoring.constructor.getPreviewer().generatePreviews(this.refactoring);
        for (let i = 0; i < this.previewRefactorings.length; i++) {
            this.previewRefactorings[i].execute();
            previewElements.push(this.previewRefactorings[i].getContext());
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
        return (
            <div className={"row"}>
                <div className={'col-md-12'}>
                    <h2>{this.refactoring.constructor.asString()}</h2>
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