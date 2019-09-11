import React from "react";
import {goBack, goTo} from "route-lite";
import RefactoringListView from "./RefactoringListView";
import PageSelector from "../PageSelector";

class RefactoringPreview extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
        this.pageSelector = new PageSelector(this);
        this.state = {
            currentPreview: null,
            errorInPreview: false,
        };
        this.handleRefactor = this.handleRefactor.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentWillMount() {
        this.previews = this.refactoring.constructor.getPreviewer().generatePreviews(this.refactoring);
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
            window.refactoringManager.getCurrentVersion().addRefactoring(this.state.currentPreview);
            goTo(RefactoringListView);
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

    render() {
        const me = this;
        const previewLinks = this.previews.map((preview, i) => {
            if (preview == this.state.currentPreview) {
                return <li>
                    <a className={'uxpainter-active-preview'} onClick={() => { me.executePreview(preview)}}>Style {i} <span className={"glyphicon glyphicon-ok"} aria-hidden={true}></span></a>
                </li>
            }
            else {
                return <li><a onClick={() => { me.executePreview(preview)}}>Style {i}</a></li>
            }
        });

        return (
            <div className={"container"}>
                <div className={"row"}>
                    <div className={'col-12'}>
                        <h5 className={'text-center'}>Refactoring Preview</h5>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <h6>{this.refactoring.constructor.asString()}</h6>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <p>Select a Style to see the result of the refactoring</p>
                        <p>When the desired style is selected, confirm the refactoring</p>
                        {this.state.errorInPreview &&
                        (<div className={"form-group"}>
                            <p className={"text-danger"}>Select a style to confirm the refactoring</p>
                        </div> )}
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"co-12"}>
                        <ul>
                            {previewLinks}
                        </ul>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={"col-4"}>
                        <a className={'btn btn-secondary'} onClick={this.handleBack}>Back</a>
                    </div>
                    <div className={"col-4"}>
                        <a onClick={this.handleRefactor} className={'btn btn-warning'}>Refactor</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default RefactoringPreview;