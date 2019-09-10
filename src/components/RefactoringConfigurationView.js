import React from "react";
import {goBack, goTo } from "route-lite";
import RefactoringPreview from "./RefactoringPreview";
import PageSelector from "../PageSelector";

class RefactoringConfigurationView extends React.Component {

    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.pageSelector = new PageSelector(this);
    }

    handleNext() {
        this.pageSelector.removeSelectedElementsHighlighting();
        goTo(RefactoringPreview, {refactoring: this.props.refactoring});
    }

    render () {
        return (
                <div className={"container"}>
                    <div className={'row col-12'}>
                        <h5 className={'text-center'}>Refactoring configuration</h5>
                    </div>
                    <div className={"row col-12"}>

                            <h6>{this.props.refactoring.constructor.asString()}</h6>
                    </div>
                    <div className={"row col-12"}>
                            <p>Complete the following information</p>
                    </div>
                    <div className={"row col-12"}>
                            {this.props.children}
                    </div>
                    <div className={'row'}>
                        <div className={"col-4"}>
                            <a className={'btn btn-secondary'} onClick={() => goBack()}>Back</a>
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