import React from 'react';
import { Link } from "route-lite";
import VersionListView from "./VersionListView";
import { generateElements } from "../js/elementGenerator";
import { Accordion } from 'react-bootstrap';
import NotElementsRefactorings from "./NotElementsRefactorings";
import SingleElementRefactorings from "./SingleElementRefactorings";
import FormElementRefactorings from "./FormElementRefactorings";


class CodeView extends React.Component {
    render() {
        let singleElementRefactoring = [];
        let formElementRefactoring = [];
        let notElementRefactoring = [];
        let elementWord = "example";

        generateElements(singleElementRefactoring, formElementRefactoring, notElementRefactoring, elementWord);
        return (
            <div className="container">
                <div className="row">
                    <h5 className='text-center col-12'>Refactorings Code</h5>
                </div>
                <Accordion>
                    <FormElementRefactorings formElementRefactoring={formElementRefactoring} counter={0} elementWord={elementWord}></FormElementRefactorings>
                    <SingleElementRefactorings singleElementRefactoring={singleElementRefactoring} counter={formElementRefactoring.length}></SingleElementRefactorings>
                    <NotElementsRefactorings notElementRefactoring={notElementRefactoring} counter={formElementRefactoring.length + singleElementRefactoring.length}></NotElementsRefactorings>
                </Accordion>
                <div className={'row uxpainter-long-row'}>
                    <div className={'col-5'}>
                        <Link className={'btn btn-secondary'} component={VersionListView}><i className="fas fa-arrow-circle-left"></i> Back</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default CodeView