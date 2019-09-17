import React from "react";
import {goBack, Link} from "route-lite";
import VersionView from "./VersionView";
import RefactoringListView from "./RefactoringListView";
import VersionListView from "./VersionListView";

class ExtendVersionView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {addingRefactoring: false}
        this.addRefactoring = this.addRefactoring.bind(this);
    }

    addRefactoring() {
        this.setState({addingRefactoring: true});
    }

    render () {
        const refactoringsApplied = window.refactoringManager.getCurrentVersion().getRefactorings().map(refactoring => {
           return (
            <div className={'row col-12'}>
               <p>{refactoring.constructor.asString()}</p>
           </div>)
        });

        return (
            <div className={"container"}>
                <h5 className={'text-center uxpainter-message'}>{window.refactoringManager.getCurrentVersion().getName()}</h5>
                {!this.state.addingRefactoring && ([
                    <div className={'row col-12'}>
                        <h5 className={'text-center'}>Refactorings Applied</h5>
                        {refactoringsApplied}
                    </div>,
                    <div className={'row uxpainter-long-row col-12'}>
                        <a className={'btn btn-warning'} onClick={this.addRefactoring}>Add Refactoring</a>
                    </div>
                ])}
                {this.state.addingRefactoring && (
                    <RefactoringListView/>
                )}
                <div className={'row uxpainter-long-row'}>
                    <div className={'col-6'}>
                        <Link className={'btn btn-dark'} component={VersionView}
                              componentProps={{version: window.refactoringManager.getCurrentVersion()}}>Save Version</Link>
                    </div>
                    <div className={'col-6'}>
                        <Link className={'btn btn-secondary'} component={VersionListView}>Back</Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default ExtendVersionView;