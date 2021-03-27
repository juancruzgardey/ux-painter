import React from 'react';
import { Link } from "route-lite";
import VersionListView from "./VersionListView";
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";

class CodeView extends React.Component {

    render() {
        let formRef = [];
        let normalRef = [];
        let notElements = [];
        const refactoringsApplied = window.refactoringManager.getCurrentVersion().getRefactorings().map(refactoring => {
            console.log('----2')
            if (refactoring.isOnElement()) {
                if (refactoring.getElementXpath().includes("form")) {
                    let separated = refactoring.getElementXpath().split("/")
                    for (let i = 0; i < separated.length; i++) {
                        if (separated[i].includes('form')) {
                            let formIndex = refactoring.getElementXpath().indexOf(separated[i]);
                            let formElementXpath = refactoring.getElementXpath().substring(0, formIndex + separated[i].length);
                            if (!formRef.includes(formElementXpath)) {
                                formRef.push(formElementXpath)
                            }
                        }
                    }
                }
                else {
                    normalRef.push(refactoring.getElementXpath())
                }
            }
            else {
                let aux = {
                    name: refactoring.constructor.asString(),
                    html: refactoring.getCode()
                }
                notElements.push(aux)
            }
            console.log(normalRef)
            console.log(formRef)
            console.log(notElements)
            console.log('----2')
            return (
                <React.Fragment>
                    <div className='row'>
                        <p className="col-12">{refactoring.constructor.asString()}:</p>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            {(typeof refactoring.getCode === "function") ?
                                <CodeBlock
                                    text={refactoring.getCode()}
                                    language="javascript"
                                    theme={dracula}
                                /> :
                                <CodeBlock
                                    text="Code generator not available for this refactoring"
                                    theme={dracula}
                                    showLineNumbers={false}
                                />}

                        </div>
                    </div>
                </React.Fragment>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    <h5 className='text-center col-12'>Refactorings Code</h5>
                </div>
                {refactoringsApplied}
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