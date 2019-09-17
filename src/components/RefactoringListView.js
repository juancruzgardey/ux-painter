import {Link, goBack} from "route-lite";
import React from "react";

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
        return (
            <div className={"row col-12"}>
                <h5 className={'text-center'}>Available Refactorings</h5>
                <div className={'row col-12'}>
                    <ul>
                        {listItems}
                    </ul>
                </div>
            </div>
        )
    }

    nextComponent(aRefactoring) {
        return aRefactoring.getSelectionView();
    }
}

export default RefactoringListView;