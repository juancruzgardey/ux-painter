import React from 'react';
import { Link } from "route-lite";
import VersionListView from "./VersionListView";
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";
import XPathInterpreter from "../refactorings/XPathInterpreter";
import { generateComponent, generateStyle, generateArray } from "../js/helpers";
var HTMLtoJSX = require('htmltojsx');

class CodeView extends React.Component {

    render() {
        var converter = new HTMLtoJSX({
            createClass: false,
            outputClassName: 'TestComponent'
          });
        // let formRef = [];
        // let formRefCodes = [];
        // let formRefImports = [];
        // let formRefFunctions = [];
        // let normalRef = [];
        // let normalXpaths = [];
        // let notElements = [];
        let singleElementRefactoring = [];
        let formElementRefactoring = [];
        let notElementRefactoring = [];
        window.refactoringManager.getCurrentVersion().getRefactorings().map(refactoring => {
            let imports;
            let mounts;
            let functions;
            let styles;
            let elementWord = "example";
            let randomInt = Math.floor(Math.random() * 9999) + 1;
            if (refactoring.isOnElement()) {            //verifico que se trate de un refactoring que afecte al menos un elemento
                let element = refactoring.getElement();
                if (refactoring.getElementXpath().includes("form")) {           //verifico si se trata de un refactoring que actua sobre un formulario
                    let formElementXpath;
                    let existsInFormElementRefactoring = false;
                    let elementIndexInFormElementRefactoring = null;
                    let separated = refactoring.getElementXpath().split("/");
                    for (let i = 0; i < separated.length; i++) {
                        if (separated[i].includes('form')) {
                            let formIndex = refactoring.getElementXpath().indexOf(separated[i]);
                            formElementXpath = refactoring.getElementXpath().substring(0, formIndex + separated[i].length);
                            break;
                        }
                    }
                    for (let j = 0; j < formElementRefactoring.length; j++) {
                        if (formElementRefactoring[j].formXpath == formElementXpath) {
                            existsInFormElementRefactoring = true;
                            elementIndexInFormElementRefactoring = j;
                            break;
                        }
                    }
                    let bodyClone = document.body.cloneNode(true);          //evito modificar el verdadero body
                    let elementXpath = refactoring.getElementXpath();
                    let elementInClone = new XPathInterpreter().getSingleElementByXpath(elementXpath, bodyClone);
                    let formElementInClone = new XPathInterpreter().getSingleElementByXpath(formElementXpath, bodyClone);
                    elementInClone.setAttribute("id", elementWord + randomInt.toString());
                    if (existsInFormElementRefactoring) {
                        let xPathModified = false;
                        let indexXpathModified;
                        let elementXpathId;
                        elementInClone = new XPathInterpreter().getSingleElementByXpath(elementXpath, formElementRefactoring[elementIndexInFormElementRefactoring].elementBody);
                        formElementInClone = new XPathInterpreter().getSingleElementByXpath(formElementXpath, formElementRefactoring[elementIndexInFormElementRefactoring].elementBody);
                        for (let i = 0; i < formElementRefactoring[elementIndexInFormElementRefactoring].elementsModified.length; i++) {
                            if (formElementRefactoring[elementIndexInFormElementRefactoring].elementsModified[i].elementXpath == elementXpath) {
                                xPathModified = true;
                                indexXpathModified = i;
                                elementXpathId = formElementRefactoring[elementIndexInFormElementRefactoring].elementsModified[i].numberId;
                                break;
                            }
                        }
                        formElementRefactoring[elementIndexInFormElementRefactoring].imports = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].imports, refactoring.imports());
                        if (xPathModified) {
                            formElementRefactoring[elementIndexInFormElementRefactoring].mounts = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].mounts, refactoring.mounts(elementWord, formElementRefactoring[elementIndexInFormElementRefactoring].elementsModified[indexXpathModified].numberId));
                            formElementRefactoring[elementIndexInFormElementRefactoring].functions = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].functions, refactoring.functions(elementWord, formElementRefactoring[elementIndexInFormElementRefactoring].elementsModified[indexXpathModified].numberId));
                            formElementRefactoring[elementIndexInFormElementRefactoring].styles = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].styles, refactoring.styles(elementWord, formElementRefactoring[elementIndexInFormElementRefactoring].elementsModified[indexXpathModified].numberId));
                        }
                        else {
                            elementInClone.setAttribute("id", elementWord + randomInt.toString());
                            // formElementRefactoring[elementIndexInFormElementRefactoring].stringFormElement       COMPROBAR: quizas sea necesario guardar el nuevo elementBody para que se almacene el ultimo setattribute
                            formElementRefactoring[elementIndexInFormElementRefactoring].stringFormElement = converter.convert(formElementInClone.outerHTML);;
                            formElementRefactoring[elementIndexInFormElementRefactoring].elementsModified.push({ elementXpath, numberId: randomInt });
                            formElementRefactoring[elementIndexInFormElementRefactoring].mounts = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].mounts, refactoring.mounts(elementWord, randomInt));
                            formElementRefactoring[elementIndexInFormElementRefactoring].functions = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].functions, refactoring.functions(elementWord, randomInt));
                            formElementRefactoring[elementIndexInFormElementRefactoring].styles = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].styles, refactoring.styles(elementWord, randomInt));
                        }
                    }
                    else {
                        imports = generateArray([], refactoring.imports());
                        mounts = generateArray([], refactoring.mounts(elementWord, randomInt));
                        functions = generateArray([], refactoring.functions(elementWord, randomInt));
                        styles = generateArray([], refactoring.styles(elementWord, randomInt));
                        let elementsModified = generateArray([], [{ elementXpath, numberId: randomInt }])
                        var output = converter.convert(formElementInClone.outerHTML);
                        const form = {
                            formXpath: formElementXpath,
                            elementBody: bodyClone,
                            stringFormElement: output,
                            elementsModified: elementsModified,
                            imports: imports,
                            mounts: mounts,
                            functions: functions,
                            styles: styles
                        };
                        formElementRefactoring.push(form);
                    }
                }
                else {
                    let existsInElementRefactoring = false;
                    let elementIndexInElementRefactoring = null;
                    let elementClone = element.cloneNode(true);
                    for (let j = 0; j < singleElementRefactoring.length; j++) {
                        if (singleElementRefactoring[j].xPath == refactoring.getElementXpath()) {
                            existsInElementRefactoring = true;
                            elementIndexInElementRefactoring = j;
                            break;
                        }
                    }
                    if (existsInElementRefactoring) {
                        if (!singleElementRefactoring[elementIndexInElementRefactoring].name.includes(refactoring.constructor.asString()))
                            singleElementRefactoring[elementIndexInElementRefactoring].name += " & " + refactoring.constructor.asString();
                        singleElementRefactoring[elementIndexInElementRefactoring].imports = generateArray(singleElementRefactoring[elementIndexInElementRefactoring].imports, refactoring.imports());
                        singleElementRefactoring[elementIndexInElementRefactoring].mounts = generateArray(singleElementRefactoring[elementIndexInElementRefactoring].mounts, refactoring.mounts(elementWord, singleElementRefactoring[elementIndexInElementRefactoring].numberId));
                        singleElementRefactoring[elementIndexInElementRefactoring].functions = generateArray(singleElementRefactoring[elementIndexInElementRefactoring].functions, refactoring.functions(elementWord, singleElementRefactoring[elementIndexInElementRefactoring].numberId));
                        singleElementRefactoring[elementIndexInElementRefactoring].styles = generateArray(singleElementRefactoring[elementIndexInElementRefactoring].styles, refactoring.styles(elementWord, singleElementRefactoring[elementIndexInElementRefactoring].numberId));
                    }
                    else {
                        imports = generateArray([], refactoring.imports());
                        mounts = generateArray([], refactoring.mounts(elementWord, randomInt));
                        functions = generateArray([], refactoring.functions(elementWord, randomInt));
                        styles = generateArray([], refactoring.styles(elementWord, randomInt));
                        elementClone.setAttribute("id", elementWord + randomInt.toString());
                        var output = converter.convert(elementClone.outerHTML);
                        const elementData = {
                            name: refactoring.constructor.asString(),
                            xPath: refactoring.getElementXpath(),
                            stringElement: output,
                            numberId: randomInt,
                            imports: imports,
                            mounts: mounts,
                            functions: functions,
                            styles: styles
                        }
                        singleElementRefactoring.push(elementData);
                    }
                }
            }
            else {
                let existsInNotElementRefactoring = false;
                for (let j = 0; j < notElementRefactoring.length; j++) {
                    if (notElementRefactoring[j].name == refactoring.constructor.asString()) {
                        existsInNotElementRefactoring = true;
                        break;
                    }
                }
                if (!existsInNotElementRefactoring) {
                    var output = converter.convert(refactoring.stringRefactoring(elementWord, randomInt));
                    let notEelement = {
                        name: refactoring.constructor.asString(),
                        stringRefactoring: output,
                        imports: refactoring.imports(),
                        mounts: refactoring.mounts(elementWord, randomInt),
                        functions: refactoring.functions(elementWord, randomInt),
                        styles: refactoring.styles(elementWord, randomInt),
                    }
                    notElementRefactoring.push(notEelement)
                }
            }
        });
        console.log(singleElementRefactoring)
        console.log(formElementRefactoring)
        console.log(notElementRefactoring)
        const notElementsRefactorings = notElementRefactoring.map(refactoring => {
            let text = generateComponent(refactoring.imports, refactoring.mounts, refactoring.functions, refactoring.stringRefactoring);
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
        const normalRefactorings = singleElementRefactoring.map(refactoring => {
            let text = generateComponent(refactoring.imports, refactoring.mounts, refactoring.functions, refactoring.stringElement);
            return (
                <React.Fragment>
                    <div className='row'>
                        <p className="col-12">{refactoring.name}:</p>
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
        const formRefactorings = formElementRefactoring.map((refactoring, i) => {
            let text = generateComponent(refactoring.imports, refactoring.mounts, refactoring.functions, refactoring.stringFormElement);
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