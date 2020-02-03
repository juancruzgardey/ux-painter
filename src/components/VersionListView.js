import React from "react";
import {Link, goTo} from "route-lite";
import ExtendVersionView from "./ExtendVersionView";
import VersionView from "./VersionView";

class VersionListView extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    getCurrentVersion() {
        return window.refactoringManager.getCurrentVersion().getName()?window.refactoringManager.getCurrentVersion().getName():'Original';
    }

    handleClick(event) {
        const selectedVersion = window.refactoringManager.getAllVersions()[event.target.getAttribute("data-version")];
        window.refactoringManager.getCurrentVersion().unDo();
        window.refactoringManager.setCurrentVersion(selectedVersion);
        selectedVersion.execute();
        window.refactoringManager.save();
        goTo(ExtendVersionView);
    }

    render() {
        const allVersions = window.refactoringManager.getAllVersions().map((version, i) => {
            return (
            <div className={'row col-12'}>
                <div className={'col-6 offset-2'}>
                    <p className={'uxpainter-message'} style={{"font-size": "18px"}} data-tip={'Clone version'}>
                        {version.getName()} {window.refactoringManager.getOriginalVersionName() == version.getName()
                         && (<i className="fas fa-lock"></i>)}
                    </p>
                </div>
                <div className={'col-1 offset-1'}>
                    {window.refactoringManager.getOriginalVersionName() != version.getName() && (
                    <a className={"uxpainter-icon-link"} data-version={i} onClick={this.handleClick}>
                        <i data-version={i} className="fas fa-edit fa-lg"></i>
                    </a>)}
                </div>
                <div className={'col-1'}>
                    <Link className={"uxpainter-icon-link"} component={VersionView} componentProps={{version: version}}>
                        <i data-version={i} className="far fa-clone fa-lg"></i>
                    </Link>
                </div>
            </div>)
        });

        return (
            <div className={"container"}>
                <h2 className={'text-center'}>Versions</h2>
                <div className={'row'} style={{"margin-top": "20px"}}>
                    {allVersions}
                </div>
                <div className={'row col-11 offset-1'}>
                    <Link className={'btn btn-warning'} component={VersionView}
                          componentProps={{version: window.refactoringManager.getOriginalVersion()}}>New version <i className="fas fa-plus-circle"></i>
                    </Link>
                </div>
            </div>
        )
    }

}

export default VersionListView;