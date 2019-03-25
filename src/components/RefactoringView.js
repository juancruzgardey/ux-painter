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
        this.originalTargetElement = this.refactoring.getElement();
        this.createModal();
    }

    createModal() {
        this.modal = document.createElement("div");
        this.modal.id = "ux-painter-preview";
        this.modal.setAttribute("class", "ux-painter-modal");
        document.body.appendChild(this.modal);
    }

    handleSubmit() {
        this.refactoring.setElement(this.originalTargetElement);
        this.refactoring.execute();
    }

    handlePreviewClick () {
        const clonedTargetElement = this.originalTargetElement.cloneNode(true);
        this.refactoring.setElement(clonedTargetElement);

        // executes the refactoring on the cloned element
        this.refactoring.execute();

        ReactDOM.render(<PreviewModal targetElement={clonedTargetElement}/>, this.modal);
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