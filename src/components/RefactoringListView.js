import {Link} from "route-lite";
import ElementSelectionView from "./ElementSelectionView";
import RenameElementRefactoring from "../refactorings/RenameElementRefactoring";
import React from "react";
import AddTooltipRefactoring from "../refactorings/AddTooltipRefactoring";
import TurnInputIntoRadiosRefactoring from "../refactorings/TurnInputIntoRadiosRefactoring";
import AddDatePickerRefactoring from "../refactorings/AddDatePickerRefactoring";
import DateInputIntoSelectsRefactoring from "../refactorings/DateInputIntoSelectsRefactoring";
import AddAutocompleteRefactoring from "../refactorings/AddAutocompleteRefactoring";

class RefactoringListView extends React.Component {

    constructor(props) {
        super(props);
        this.refactorings = [RenameElementRefactoring, AddTooltipRefactoring, TurnInputIntoRadiosRefactoring, AddDatePickerRefactoring, DateInputIntoSelectsRefactoring, AddAutocompleteRefactoring];
    }

    render () {
        const listItems = this.refactorings.map((refactoring, i) => {
            return <li><Link component={ElementSelectionView} componentProps={{refactoring: refactoring}}>{refactoring.asString()}</Link></li>
        });
        return ([
                <h1>Availables Refactorings</h1>,
                <ul>
                    {listItems}
                </ul>]
        )
    }
}

export default RefactoringListView;