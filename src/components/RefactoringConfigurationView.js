import React from "react";
import {goBack, goTo } from "route-lite";
import RefactoringPreview from "./RefactoringPreview";
import PageSelector from "../PageSelector";

class RefactoringConfigurationView extends React.Component {

    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.pageSelector = new PageSelector(this);
    }

    handleNext() {
        if (this.props.child && this.props.child.onNext()) {
            this.pageSelector.removeSelectedElementsHighlighting();
            goTo(RefactoringPreview, {refactoring: this.props.refactoring});
        }
    }

    handleBack() {
        if (this.props.child) {
            this.props.child.onBack();
        }
        goBack();
    }

    render () {
        return (
                <div className={"container"}>
                    <div className={'row col-12'}>
                        <h5 className={'text-center'}>{this.props.refactoring.constructor.asString()}</h5>
                    </div>
                    <div className={"row col-12"}>
                        {(this.props.description) && (<p>{this.props.description}</p>)}
                        {(!this.props.description) && (<p>Complete the following information</p>)}
                    </div>
                    <div className={"row col-12"}>
                            {this.props.children}
                    </div>
                    <div className={'row'}>
                        <div className={"col-4"}>
                            <a className={'btn btn-secondary'} onClick={this.handleBack}>Back</a>
                        </div>
                        <div className={"col-4"}>
                            <a onClick={this.handleNext} className={'btn btn-warning'}>Next</a>
                        </div>
                    </div>
                </div>
        )
    }
}

export default RefactoringConfigurationView;