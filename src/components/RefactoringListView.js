import {Link} from "route-lite";
import ElementSelectionView from "./ElementSelectionView";
import RenameElementRefactoring from "../refactorings/RenameElementRefactoring";
import React from "react";
import AddTooltipRefactoring from "../refactorings/AddTooltipRefactoring";
import TurnInputIntoRadiosRefactoring from "../refactorings/TurnInputIntoRadiosRefactoring";
import AddDatePickerRefactoring from "../refactorings/AddDatePickerRefactoring";
import DateInputIntoSelectsRefactoring from "../refactorings/DateInputIntoSelectsRefactoring";
import AddAutocompleteRefactoring from "../refactorings/AddAutocompleteRefactoring";
import ResizeInputRefactoring from "../refactorings/ResizeInputRefactoring";
import LinkToTopRefactoring from "../refactorings/LinkToTopRefactoring";
import RefactoringView from "./RefactoringView";
import TurnAttributeIntoLinkRefactoring from "../refactorings/TurnAttributeIntoLinkRefactoring";

class RefactoringListView extends React.Component {

    constructor(props) {
        super(props);
        this.refactorings = [RenameElementRefactoring, AddTooltipRefactoring, TurnInputIntoRadiosRefactoring, AddDatePickerRefactoring, DateInputIntoSelectsRefactoring, AddAutocompleteRefactoring,
        ResizeInputRefactoring,LinkToTopRefactoring, TurnAttributeIntoLinkRefactoring];
    }

    render () {
        const me = this;
        const listItems = this.refactorings.map((refactoringClass, i) => {
            let refactoring = new refactoringClass();
            return <li><Link component={me.nextComponent(refactoring)} componentProps={{refactoring: refactoring}}>{refactoringClass.asString()}</Link></li>
        });
        return ([
                <h2 className={'text-center'}>Refactorings</h2>,
                <ul>
                    {listItems}
                </ul>]
        )
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