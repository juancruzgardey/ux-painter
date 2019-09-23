import React from "react";
import {goBack, goTo} from "route-lite";
import RefactoringListView from "./RefactoringListView";
import PageSelector from "../PageSelector";
import ExtendVersionView from "./ExtendVersionView";

class RefactoringPreview extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
        this.pageSelector = new PageSelector(this);
        this.pageSelector.removeSelectedElementsHighlighting();
        this.state = {
            currentPreview: null,
            errorInPreview: false,
        };
        this.handleRefactor = this.handleRefactor.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentWillMount() {
        this.previews = this.refactoring.constructor.getPreviewer().generatePreviews(this.refactoring);
        this.executePreview(this.previews[0]);
    }

    executePreview(previewRefactoring) {
        if (this.state.currentPreview) {
            this.state.currentPreview.unDo();
        }
        previewRefactoring.execute();
        this.setState({currentPreview: previewRefactoring});
    }

    handleRefactor() {
        if (this.state.currentPreview) {
            this.state.currentPreview.setURL(document.location.href);
            window.refactoringManager.addDirtyRefactoring(this.state.currentPreview);
            goTo(ExtendVersionView, {addingRefactoring: false});
        }
        else {
            this.setState({errorInPreview: true});
        }
    }

    handleBack() {
        if (this.state.currentPreview) {
            this.state.currentPreview.unDo();
        }
        goBack();
    }

    isOnePreview() {
        return this.previews.length == 1;
    }

    render() {
        const me = this;
        const previewLinks = this.previews.map((preview, i) => {
            if (preview == this.state.currentPreview) {
                return (
                <li>
                    <a className={'uxpainter-active-preview list-link'} onClick={() => { me.executePreview(preview)}}>Style {i + 1} <i className="fas fa-eye fa-lg"></i></a>
                </li>)
            }
            else {
                return <li><a className={'list-link'} onClick={() => { me.executePreview(preview)}}>Style {i + 1}</a></li>
            }
        });

        return (
            <div className={"container"}>
                <div className={"row"}>
                    <div className={'col-12'}>
                        <h5 className={'text-center'}>Refactoring Preview</h5>
                    </div>
                </div>
                <div className={"row uxpainter-long-row col-12"}>
                    <h6>{this.refactoring.constructor.asString()}</h6>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <p className={'uxpainter-message'}>Observe how the refactored page will looks like</p>
                        {this.previews.length > 1 && ([
                            <p>There are different styles to apply in this refactoring</p>,
                            <p className={'uxpainter-message'}>Select the desired one and confirm the refactoring</p>
                        ])}
                        {this.state.errorInPreview &&
                        (<div className={"form-group"}>
                            <p className={"text-danger"}>Select a style to confirm the refactoring</p>
                        </div> )}
                    </div>
                </div>
                {this.previews.length > 1 && (
                    <div className={"row"}>
                        <div className={"co-12"}>
                            <ul>
                                {previewLinks}
                            </ul>
                        </div>
                    </div>)}
                <div className={'row'}>
                    <div className={"col-6"}>
                        <a className={'btn btn-secondary'} onClick={this.handleBack}>
                            <i className="fas fa-arrow-circle-left"></i> Back</a>
                    </div>
                    <div className={"col-6"}>
                        <a onClick={this.handleRefactor} className={'btn btn-warning'}>Refactor <i className="fas fa-hammer fa-sm"></i></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default RefactoringPreview;