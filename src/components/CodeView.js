import React from 'react';
import { Link } from "route-lite";
import VersionListView from "./VersionListView";
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";
import XPathInterpreter from "../refactorings/XPathInterpreter";

class CodeView extends React.Component {
    render() {
        let formRef = [];
        let formRefTips = [];
        let normalRef = [];
        let normalXpaths = [];
        let notElements = [];
        window.refactoringManager.getCurrentVersion().getRefactorings().map(refactoring => {
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
                            const findI = (element) => element == formElementXpath;
                            let indexaux = formRef.findIndex(findI);
                            if (typeof refactoring.tip === "function") {
                                if (formRefTips[indexaux] == null) {
                                    formRefTips[indexaux] = []
                                }
                                formRefTips[indexaux].push(refactoring.tip());
                            }
                            break;
                        }
                    }
                }
                else {
                    let aux = {
                        name: refactoring.constructor.asString(),
                        xPath: refactoring.getElementXpath(),
                        tip: []
                    }
                    let tip = (typeof refactoring.tip === "function") ? refactoring.tip() : null
                    if (!normalXpaths.includes(refactoring.getElementXpath())) {
                        normalXpaths.push(refactoring.getElementXpath());
                        if (tip != null) {
                            aux.tip.push(tip)
                        }
                        normalRef.push(aux);
                    }
                    else {
                        for (let i = 0; i < normalRef.length; i++) {
                            if (normalRef[i].xPath == refactoring.getElementXpath()) {
                                normalRef[i].name += " & " + aux.name;
                                if (tip != null) {
                                    normalRef[i].tip.push(tip);
                                }
                                break;
                            }
                        }
                    }
                }
            }
            else {
                let aux = {
                    name: refactoring.constructor.asString(),
                    html: refactoring.getCode()
                }
                notElements.push(aux)
            }
        });
        const notElementsRefactorings = notElements.map(refactoring => {
            return (
                <React.Fragment>
                    <div className='row'>
                        <p className="col-12">{refactoring.name}:</p>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <CodeBlock
                                text={refactoring.html}
                                language="javascript"
                                theme={dracula}
                            />
                        </div>
                    </div>
                </React.Fragment>
            )
        });
        const normalRefactorings = normalRef.map(refactoring => {
            let element = new XPathInterpreter().getSingleElementByXpath(refactoring.xPath, document.body);
            return (
                <React.Fragment>
                    <div className='row'>
                        <p className="col-12">{refactoring.name}:</p>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <CodeBlock
                                text={element.outerHTML}
                                language="javascript"
                                theme={dracula}
                            />
                        </div>
                    </div>
                    {refactoring.tip.map(tipaso => {
                        return (
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <CodeBlock
                                        text={tipaso}
                                        language="javascript"
                                        theme={dracula}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </React.Fragment>
            )
        });
        const formRefactorings = formRef.map((refactoring, i) => {
            let element = new XPathInterpreter().getSingleElementByXpath(refactoring, document.body);
            return (
                <React.Fragment>
                    <div className='row'>
                        <p className="col-12">Form #{i + 1}:</p>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <CodeBlock
                                text={element.outerHTML}
                                language="javascript"
                                theme={dracula}
                            />
                        </div>
                    </div>
                    {formRefTips[i] != null ? formRefTips[i].map(tipaso => {
                        return (
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <CodeBlock
                                        text={tipaso}
                                        language="javascript"
                                        theme={dracula}
                                    />
                                </div>
                            </div>
                        )
                    }): null}
                </React.Fragment>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    <h5 className='text-center col-12'>Refactorings Code</h5>
                </div>
                {notElementsRefactorings}
                {normalRefactorings}
                {formRefactorings}
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