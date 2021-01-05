import React from 'react';
import { Link } from "route-lite";
import VersionListView from "./VersionListView";

class CodeView extends React.Component {

    render() {
        const refactoringsApplied = window.refactoringManager.getCurrentVersion().getRefactorings().map(refactoring => {
            console.log(refactoring.constructor)
            return (
                <React.Fragment>
                    <div className={'row col-12'}>
                        <p>{refactoring.constructor.asString()}</p>
                    </div>
                    <div className="row col-12">
                        <p>{refactoring.constructor.getCode()}</p>
                    </div>
                </React.Fragment>
            )
        });
        return (
            <div className="container">
                <div className={'row col-12 uxpainter-long-row'}>
                    <h5 className={'text-center'}>Refactorings Code</h5>
                    {refactoringsApplied}
                </div>
                <div className={'row uxpainter-long-row'}>
                    <div className={'col-5'}>
                        <Link className={'btn btn-secondary'} component={VersionListView}><i className="fas fa-arrow-circle-left"></i> Back</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default CodeView