import {Link, goBack} from "route-lite";
import React from "react";
import 'tipr/tipr/tipr.css';
import RefactoringDescriptionView from "./RefactoringDescriptionView";
const $ = require('jquery');
//global.jQuery = $;
window.jQuery = $;
require ('tipr');

class RefactoringListView extends React.Component {

    constructor(props) {
        super(props);
    }


    render () {
        const me = this;
        const listItems = window.refactoringManager.getRefactoringCatalogue().map((refactoringClass, i) => {
            let refactoring = new refactoringClass();
            return (
            <li>
                <Link className={'list-link'} component={me.nextComponent(refactoring)} componentProps={{refactoring: refactoring}}>{refactoringClass.asString()}</Link>
                <Link component={RefactoringDescriptionView} componentProps={{refactoring: refactoring}}
                      className={'uxpainter-refactoring-info'}>
                    <i className="fas fa-info-circle fa-lg"></i>
                </Link>
                {refactoring.codeAvaiable() ? <i class="fas fa-check-circle text-success"></i>: <i class="fas fa-times-circle text-danger"></i>}
            </li>)
        });
        return (
            <div className={"row uxpainter-long-row"}>
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