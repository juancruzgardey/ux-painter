import React from "react";
import domtoimage from "dom-to-image";
import RefactoringListView from "./RefactoringListView";
import {goBack, Link} from "route-lite";

class RefactoringPreview extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;

        console.log(this.refactoring);

        this.originalTargetElement = this.refactoring.getElement();
        this.clonedTargetElement = this.originalTargetElement.cloneNode(true);
        this.refactoring.setElement(this.clonedTargetElement);
        this.clonedTargetElement.id = "cloned-element";

        this.previewContainer = React.createRef();

        // executes the refactoring on cloned element
        this.refactoring.execute();

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        this.previewContainer.current.appendChild(this.clonedTargetElement);
    }

    handleSubmit() {
        this.refactoring.setElement(this.originalTargetElement);
        this.refactoring.execute();
    }

    render () {
        return (
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <h2>Preview</h2>
                    <div className={'form-group'}>
                        <div className={'col-md-12 preview-container'} ref={this.previewContainer}></div>
                    </div>
                    <div className={'form-group'}>
                        <Link className={'btn btn-warning'} onClick={this.handleSubmit} component={RefactoringListView}>Refactor</Link>
                    </div>
                    <div className={'form-group'}>
                        <Link className={'btn btn-secondary'} onClick={() => goBack()}>Back</Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default RefactoringPreview;