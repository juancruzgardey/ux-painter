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
import AddFormValidationRefactoring from "../refactorings/AddFormValidationRefactoring";
import TurnInputIntoSelectRefactoring from "../refactorings/TurnInputIntoSelectRefactoring";
import AddLinkRefactoring from "../refactorings/AddLinkRefactoring";

class RefactoringListView extends React.Component {

    constructor(props) {
        super(props);
        this.refactorings = [AddAutocompleteRefactoring, AddDatePickerRefactoring, AddFormValidationRefactoring, AddLinkRefactoring,
            AddTooltipRefactoring, DateInputIntoSelectsRefactoring, LinkToTopRefactoring, RenameElementRefactoring,
            ResizeInputRefactoring, TurnAttributeIntoLinkRefactoring,
            TurnInputIntoRadiosRefactoring, TurnInputIntoSelectRefactoring];
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