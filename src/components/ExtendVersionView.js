import React from "react";
import {goBack, Link} from "route-lite";
import VersionView from "./VersionView";
import RefactoringListView from "./RefactoringListView";
import VersionListView from "./VersionListView";

class ExtendVersionView extends React.Component {

    constructor(props) {
        super(props);
        if (!this.props.addingRefactoring) {
            this.state = {addingRefactoring: false}
        }
        else {
            this.state = {addingRefactoring: this.props.addingRefactoring}
        }
        this.addRefactoring = this.addRefactoring.bind(this);
        this.cancelRefactoring = this.cancelRefactoring.bind(this);
    }

    addRefactoring() {
        this.setState({addingRefactoring: true});
    }

    cancelRefactoring() {
        this.setState({addingRefactoring:false});
    }

    render () {
        const refactoringsApplied = window.refactoringManager.getCurrentVersion().getRefactorings().map(refactoring => {
           return (
            <div className={'row col-12'}>
               <p>{refactoring.constructor.asString()}</p>
           </div>)
        });

        const dirtyRefactorings = window.refactoringManager.getDirtyRefactorings().map (dirtyRefactoring => {
            return (
                <div className={'row col-12'}>
                    <p className={'uxpainter-message'}>{dirtyRefactoring.constructor.asString()}*</p>
                </div>
            )
        });

        return (
            <div className={"container"}>
                <h5 className={'text-center uxpainter-message'}>{window.refactoringManager.getCurrentVersion().getName()}</h5>
                {!this.state.addingRefactoring && ([
                    <div className={'row col-12 uxpainter-long-row'}>
                        <h5 className={'text-center'}>Refactorings Applied</h5>
                        {refactoringsApplied}
                        {dirtyRefactorings}
                        {refactoringsApplied.length == 0 && dirtyRefactorings.length == 0 && (
                            <div className={"form-group"}>
                                <p>This version has no refactorings.</p>
                            </div>
                        )}
                    </div>,
                    <div className={'row uxpainter-long-row col-12'}>
                        <a className={'btn btn-warning'} onClick={this.addRefactoring}>Add Refactoring</a>
                    </div>,
                    <div className={'row uxpainter-long-row'}>
                        <div className={'col-4'}>
                            <Link className={'btn btn-secondary'} component={VersionListView}>Back</Link>
                        </div>
                        <div className={'col-4'}>
                            <Link className={'btn btn-dark'} component={VersionView}
                                  componentProps={{version: window.refactoringManager.getCurrentVersion()}}>Save</Link>
                        </div>
                    </div>
                ])}
                {this.state.addingRefactoring && ([
                    <RefactoringListView/>,
                    <div className={"row uxpainter-long-row col-12"}>
                        <Link className={'btn btn-danger'} onClick={this.cancelRefactoring}>Cancel <i
                            className="fas fa-times-circle"></i></Link>
                    </div>
                ])}
            </div>
        )
    }

}

export default ExtendVersionView;