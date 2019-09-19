import React from "react";
import {Link, goTo} from "route-lite";
import ExtendVersionView from "./ExtendVersionView";

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
            <div className={'row'}>
                <div className={'col-6'}>
                    <p className={'uxpainter-message'} style={{"font-size": "18px"}}>{version.getName()}</p>
                </div>
                <div className={'col-6'}>
                    <a className={"uxpainter-icon-link"} data-version={i} onClick={this.handleClick}>
                        <i data-version={i} className="fas fa-plus fa-2x"></i>
                    </a>
                </div>
            </div>)
        });

        return (
            <div className={"container"}>
                <h2 className={'text-center'}>Versions</h2>,
                {allVersions}
            </div>
        )
    }

}

export default VersionListView;