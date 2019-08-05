import React from "react";
import {Link} from "route-lite";
import RefactoringListView from "./RefactoringListView";

class VersionListView extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    getCurrentVersion() {
        return window.refactoringManager.getCurrentVersion().getName()?window.refactoringManager.getCurrentVersion().getName():'Original';
    }

    handleClick(event) {
        window.refactoringManager.setCurrentVersion(window.refactoringManager.getAllVersions()[event.target.getAttribute("data-version")]);
        window.refactoringManager.save();
        document.location.reload();
    }

    render() {
        const listItems = window.refactoringManager.getAllVersions().map((version, i) => {
            return <li><a data-version={i} onClick={this.handleClick}>{version.getName()}</a></li>
        });

        return ([
            <h2 className={'text-center'}>Versions</h2>,
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <ul>
                        {listItems}
                    </ul>
                </div>
            </div>,
            <div className={'row'}>
                <p>Current version: {this.getCurrentVersion()}</p>
            </div>,
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <Link className={'btn btn-warning'} component={RefactoringListView}>Add Refactoring</Link>
                </div>
            </div>
        ])
    }

}

export default VersionListView;