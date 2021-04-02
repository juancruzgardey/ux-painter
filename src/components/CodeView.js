import React from 'react';
import { Link } from "route-lite";
import VersionListView from "./VersionListView";
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";
import XPathInterpreter from "../refactorings/XPathInterpreter";
import { generateComponent, generateNotElementComponent } from "../js/helpers";

class CodeView extends React.Component {

    render() {
        let formRef = [];
        let formRefCodes = [];
        let formRefImports = [];
        let formRefFunctions = [];
        let normalRef = [];
        let normalXpaths = [];
        let notElements = [];
        window.refactoringManager.getCurrentVersion().getRefactorings().map(refactoring => {
            let randomInt = Math.floor(Math.random() * 9999) + 1;
            let auxString = "example";
            let code = null;
            let imports = null;
            if (typeof refactoring.code === "function") {
                code = refactoring.code(auxString, randomInt);
            }
            if (typeof refactoring.imports === "function") {
                imports = refactoring.imports();
            }
            if (refactoring.isOnElement()) {
                let element = refactoring.getElement();
                element.setAttribute("id", auxString + randomInt.toString());
                if (refactoring.getElementXpath().includes("form")) {
                    if (typeof refactoring.hasInside === "function") {
                        let formElementXpath = refactoring.getElementXpath();
                        if (!formRef.includes(formElementXpath))
                            formRef.push(formElementXpath);
                        const findI = (auxelement) => auxelement == formElementXpath;
                        let indexaux = formRef.findIndex(findI);
                        let requiredImputs = refactoring.getRequiredInputs();
                        let randomIntCollection = [];
                        for (let i = 0; i< requiredImputs.length; i++) {
                            let randomIntAux = Math.floor(Math.random() * 9999) + 1;
                            requiredImputs[i].setAttribute("id", auxString + randomIntAux.toString());
                            randomIntCollection.push(randomIntAux);
                        }
                        let functions = refactoring.functions(auxString, randomIntCollection, randomInt);
                        if (formRefFunctions[indexaux] == null)
                            formRefFunctions[indexaux] = []
                        formRefFunctions[indexaux].push(functions);
                        if (formRefCodes[indexaux] == null)
                            formRefCodes[indexaux] = []
                        formRefCodes[indexaux].push(code);
                        if (typeof refactoring.imports === "function") {
                            if (formRefImports[indexaux] == null)
                                formRefImports[indexaux] = [];
                            if (!formRefImports[indexaux].includes(imports))
                                formRefImports[indexaux].push(imports);
                        }
                    }
                    else {
                        let separated = refactoring.getElementXpath().split("/");
                        for (let i = 0; i < separated.length; i++) {
                            if (separated[i].includes('form')) {
                                let formIndex = refactoring.getElementXpath().indexOf(separated[i]);
                                let formElementXpath = refactoring.getElementXpath().substring(0, formIndex + separated[i].length);
                                if (!formRef.includes(formElementXpath))
                                    formRef.push(formElementXpath)
                                const findI = (auxelement) => auxelement == formElementXpath;
                                let indexaux = formRef.findIndex(findI);
                                if (typeof refactoring.code === "function") {
                                    if (formRefCodes[indexaux] == null)
                                        formRefCodes[indexaux] = []
                                    formRefCodes[indexaux].push(code);
                                }
                                if (typeof refactoring.imports === "function") {
                                    if (formRefImports[indexaux] == null)
                                        formRefImports[indexaux] = [];
                                    if (!formRefImports[indexaux].includes(imports))
                                        formRefImports[indexaux].push(imports);
                                }
                                break;
                            }
                        }
                    }
                }
                else {
                    let aux = {
                        name: refactoring.constructor.asString(),
                        xPath: refactoring.getElementXpath(),
                        code: [],
                        imports: []
                    }
                    if (!normalXpaths.includes(refactoring.getElementXpath())) {
                        normalXpaths.push(refactoring.getElementXpath());
                        if (code != null) {
                            aux.code.push(code)
                        }
                        if (imports != null) {
                            aux.imports.push(imports)
                        }
                        normalRef.push(aux);
                    }
                    else {
                        for (let i = 0; i < normalRef.length; i++) {
                            if (normalRef[i].xPath == refactoring.getElementXpath()) {
                                normalRef[i].name += " & " + aux.name;
                                if (code != null) {
                                    normalRef[i].code.push(code);
                                }
                                if (imports != null) {
                                    normalRef[i].imports.push(imports)
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
                    functions: refactoring.functions(auxString, randomInt),
                    mount: refactoring.mount(auxString, randomInt),
                    render: code
                }
                notElements.push(aux)
            }
        });
        const notElementsRefactorings = notElements.map(refactoring => {
            let imports = "";
            let text = generateComponent(imports, refactoring.mount, refactoring.render, refactoring.functions)
            return (
                <React.Fragment>
                    <div className='row'>
                        <p className="col-12">{refactoring.name}:</p>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <CodeBlock
                                text={text}
                                language="javascript"
                                theme={dracula}
                            />
                        </div>
                    </div>
                    <hr className="m-0"></hr>
                </React.Fragment>
            )
        });
        const normalRefactorings = normalRef.map(refactoring => {
            let element = new XPathInterpreter().getSingleElementByXpath(refactoring.xPath, document.body);
            let theCode = "";
            let imports = "";
            let functions = "";
            if (!refactoring.imports.length == 0) {
                refactoring.imports.map(imports2 => {
                    imports += imports2 + "\n";
                })
            }
            if (!refactoring.code.length == 0) {
                refactoring.code.map(code => {
                    theCode += code + "\n"
                })
            }
            let text = generateComponent(imports, theCode, element.outerHTML, functions);
            return (
                <React.Fragment>
                    <div className='row'>
                        <p className="col-12">{refactoring.name}:</p>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <CodeBlock
                                text={text}
                                language="javascript"
                                theme={dracula}
                            />
                        </div>
                    </div>
                    <hr className="m-0"></hr>
                </React.Fragment>
            )
        });
        const formRefactorings = formRef.map((refactoring, i) => {
            let element = new XPathInterpreter().getSingleElementByXpath(refactoring, document.body);
            let theCode = "";
            let imports = "";
            let functions = "";
            if (formRefCodes[i] != null) {
                formRefCodes[i].map(codaso => {
                    theCode += codaso + "\n"
                })
            }
            if (formRefImports[i] != null) {
                formRefImports[i].map(imports2 => {
                    imports += imports2 + "\n"
                })
            }
            if (formRefFunctions[i] != null) {
                formRefFunctions[i].map(functions2 => {
                    functions += functions2 + "\n"
                })
            }
            let text = generateComponent(imports, theCode, element.outerHTML, functions);
            return (
                <React.Fragment>
                    <div className='row'>
                        <p className="col-12">Form #{i + 1}:</p>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <CodeBlock
                                text={text}
                                language="jsx"
                                theme={dracula}
                            />
                        </div>
                    </div>
                    <hr className="m-0"></hr>
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