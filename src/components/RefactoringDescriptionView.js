/*global chrome*/
import React from 'react';
import {Link} from 'route-lite';
import ExtendVersionView from "./ExtendVersionView";

class RefactoringDescriptionView extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
    }

    render() {
        return (
            <div className={"container"}>
                <div className={"row col-12"}>
                    <h5 className={'text-center'}>{this.refactoring.constructor.asString()}</h5>
                </div>
                <div className={"row col-12"}>
                    <div className={'form-group'}>
                        <p className={'uxpainter-message'}>{this.refactoring.getDescription()}</p>
                    </div>
                </div>
                {this.refactoring.getDemoResources() && ([
                    <div className={"row form-group"}>
                        <img className={"img-thumbnail"} src={chrome.runtime.getURL("ref_examples/" + this.refactoring.getDemoResources()[0])}/>
                    </div>,
                    <div className={"row form-group"}>
                        <i className="text-center fas fa-arrow-down fa-3x" style={{margin:"auto"}}></i>
                    </div>,
                    <div className={"row form-group"}>
                        <img className={"img-thumbnail"} src={chrome.runtime.getURL("ref_examples/" + this.refactoring.getDemoResources()[1])}/>
                    </div>
                ])}
                <div className={"row col-12"}>
                    <Link className={'btn btn-secondary'} component={ExtendVersionView} componentProps={{addingRefactoring: true}}>Back</Link>
                </div>
            </div>
        )
    }
}

export default RefactoringDescriptionView;