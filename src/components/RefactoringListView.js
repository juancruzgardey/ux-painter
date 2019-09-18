import {Link, goBack} from "route-lite";
import React from "react";
import 'tipr/tipr/tipr.css';
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
                <Link component={me.nextComponent(refactoring)} componentProps={{refactoring: refactoring}}>{refactoringClass.asString()}</Link>
                <a className={'uxpainter-refactoring-info tip'} data-tip="refactoring description">
                    <i className="fas fa-info-circle fa-lg"></i>
                </a>
            </li>)
        });
        return (
            <div className={"row"}>
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