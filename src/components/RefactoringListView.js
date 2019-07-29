import {Link} from "route-lite";
import ElementSelectionView from "./ElementSelectionView";
import VersionView from "./VersionView";
import React from "react";
import RefactoringView from "./RefactoringView";

class RefactoringListView extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        const me = this;
        const listItems = window.refactoringManager.getRefactoringCatalogue().map((refactoringClass, i) => {
            let refactoring = new refactoringClass();
            return <li><Link component={me.nextComponent(refactoring)} componentProps={{refactoring: refactoring}}>{refactoringClass.asString()}</Link></li>
        });
        return ([
                <h2 className={'text-center'}>Refactorings</h2>,
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
                        <Link className={'btn btn-warning'} component={VersionView}
                              componentProps={{version: window.refactoringManager.getCurrentVersion()}}>Save</Link>
                    </div>
                </div>
        ])
    }

    getCurrentVersion() {
        return window.refactoringManager.getCurrentVersion().getName()?window.refactoringManager.getCurrentVersion().getName():'Original';
    }

    nextComponent(aRefactoring) {
        if (aRefactoring.getElement()) {
            return RefactoringView;
        }
        else {
            return ElementSelectionView;
        }
    }
}

export default RefactoringListView;