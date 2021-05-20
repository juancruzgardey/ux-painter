import React from 'react';
import { Link } from "route-lite";
import VersionListView from "./VersionListView";
import { CodeBlock, dracula } from "react-code-blocks";
import XPathInterpreter from "../refactorings/XPathInterpreter";
import { generateComponent, generateArray } from "../js/helpers";
import { Accordion, Card, Button } from 'react-bootstrap';

var HTMLtoJSX = require('htmltojsx');

class CodeView extends React.Component {
    render() {
        var counter = 0;
        var converter = new HTMLtoJSX({
            createClass: false,
            outputClassName: 'TestComponent'
        });
        let singleElementRefactoring = [];
        let formElementRefactoring = [];
        let notElementRefactoring = [];
        window.refactoringManager.getCurrentVersion().getRefactorings().map(refactoring => {
            let imports;
            let mounts;
            let functions;
            let elementWord = "example";
            let randomInt = Math.floor(Math.random() * 9999) + 1;
            if (refactoring.isOnElement()) {            //verifico que se trate de un refactoring que afecte al menos un elemento
                let element = refactoring.getElement();
                if (refactoring.getElementXpath().includes("form")) {           //verifico si se trata de un refactoring que actua sobre un formulario
                    if (refactoring.hasInside()) {
                        let formExistInside = false;
                        let indexIfExists = null;
                        let bodyClone = document.body.cloneNode(true);
                        let formElement = new XPathInterpreter().getSingleElementByXpath(refactoring.getElementXpath(), bodyClone);
                        for (let i = 0; formElementRefactoring.length; i++) {
                            if (formElementRefactoring[i].formXpath == refactoring.getElementXpath()) {
                                formExistInside = true;
                                indexIfExists = i;
                                bodyClone = formElementRefactoring[i].elementBody;
                                formElement = new XPathInterpreter().getSingleElementByXpath(refactoring.getElementXpath(), formElementRefactoring[i].elementBody);
                                if (formElementRefactoring[i].formXpathRandomInt != undefined) {
                                    randomInt = formElementRefactoring[i].formXpathRandomInt;
                                }
                                break;
                            }
                        }
                        formElement.setAttribute("id", elementWord + randomInt.toString());     //para guardar
                        let requiredInputsXpaths = refactoring.getRequiredInputXpaths();
                        if (formExistInside) {
                            let elements = [];
                            let preFunctions = "";
                            requiredInputsXpaths.map(xpath => {
                                let modXpath = refactoring.getElementXpath() + xpath.substring(2);
                                let xPathFound = false;
                                let randomIntExists = null;
                                for (let i = 0; i < formElementRefactoring[indexIfExists].elementsModified.length; i++) {
                                    if (formElementRefactoring[indexIfExists].elementsModified[i].elementXpath == modXpath) {
                                        xPathFound = true;
                                        randomIntExists = formElementRefactoring[indexIfExists].elementsModified[i].numberId;
                                        break;
                                    }
                                }
                                let auxElement = new XPathInterpreter().getSingleElementByXpath(xpath, formElement);
                                if (xPathFound) {
                                    preFunctions += refactoring.preFunctions(elementWord, randomIntExists);
                                    auxElement.setAttribute("id", elementWord + randomIntExists.toString());
                                }
                                else {
                                    let auxRandomInt = Math.floor(Math.random() * 9999) + 1;
                                    preFunctions += refactoring.preFunctions(elementWord, auxRandomInt);
                                    elements.push({ elementXpath: modXpath, numberId: auxRandomInt });
                                    auxElement.setAttribute("id", elementWord + auxRandomInt.toString());
                                }
                            })
                            formElementRefactoring[indexIfExists].elementsModified = generateArray(formElementRefactoring[indexIfExists].elementsModified, elements);
                            formElementRefactoring[indexIfExists].imports = generateArray(formElementRefactoring[indexIfExists].imports, refactoring.imports());
                            formElementRefactoring[indexIfExists].mounts = generateArray(formElementRefactoring[indexIfExists].mounts, refactoring.mounts(elementWord, randomInt));
                            formElementRefactoring[indexIfExists].functions = generateArray(formElementRefactoring[indexIfExists].functions, refactoring.functions(elementWord, randomInt, preFunctions));
                            formElementRefactoring[indexIfExists].stringFormElement = converter.convert(formElement.outerHTML);
                        }
                        else {
                            let elements = [];
                            let preFunctions = "";
                            requiredInputsXpaths.map(xpath => {
                                let auxRandomInt = Math.floor(Math.random() * 9999) + 1;
                                let auxElement = new XPathInterpreter().getSingleElementByXpath(xpath, formElement);
                                let modXpath = refactoring.getElementXpath() + xpath.substring(2);
                                preFunctions += refactoring.preFunctions(elementWord, auxRandomInt);
                                auxElement.setAttribute("id", elementWord + auxRandomInt.toString());
                                elements.push({ elementXpath: modXpath, numberId: auxRandomInt });
                            })
                            let elementsModified = generateArray([], elements);
                            imports = generateArray([], refactoring.imports());
                            mounts = generateArray([], refactoring.mounts(elementWord, randomInt));
                            functions = generateArray([], refactoring.functions(elementWord, randomInt, preFunctions));
                            var output = converter.convert(formElement.outerHTML);
                            const form = {
                                formXpath: refactoring.getElementXpath(),
                                elementBody: bodyClone,
                                stringFormElement: output,
                                elementsModified,
                                imports,
                                mounts,
                                functions
                            }
                            formElementRefactoring.push(form);
                        }
                    }
                    else {
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
                            }
                            else {
                                elementInClone.setAttribute("id", elementWord + randomInt.toString());
                                // formElementRefactoring[elementIndexInFormElementRefactoring].stringFormElement       COMPROBAR: quizas sea necesario guardar el nuevo elementBody para que se almacene el ultimo setattribute
                                formElementRefactoring[elementIndexInFormElementRefactoring].stringFormElement = converter.convert(formElementInClone.outerHTML);;
                                formElementRefactoring[elementIndexInFormElementRefactoring].elementsModified.push({ elementXpath, numberId: randomInt });
                                formElementRefactoring[elementIndexInFormElementRefactoring].mounts = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].mounts, refactoring.mounts(elementWord, randomInt));
                                formElementRefactoring[elementIndexInFormElementRefactoring].functions = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].functions, refactoring.functions(elementWord, randomInt));
                            }
                        }
                        else {
                            imports = generateArray([], refactoring.imports());
                            mounts = generateArray([], refactoring.mounts(elementWord, randomInt));
                            functions = generateArray([], refactoring.functions(elementWord, randomInt));
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
                            };
                            formElementRefactoring.push(form);
                        }
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
                        singleElementRefactoring[elementIndexInElementRefactoring].functions = generateArray(singleElementRefactoring[elementIndexInElementRefactoring].functions, refactoring.functions(elementWord, singleElementRefactoring[elementIndexInElementRefactoring].numberId));
                    }
                    else {
                        imports = generateArray([], refactoring.imports());
                        functions = generateArray([], refactoring.functions(elementWord, randomInt));
                        elementClone.setAttribute("id", elementWord + randomInt.toString());
                        var output = converter.convert(elementClone.outerHTML);
                        const elementData = {
                            name: refactoring.constructor.asString(),
                            xPath: refactoring.getElementXpath(),
                            stringElement: output,
                            numberId: randomInt,
                            imports: imports,
                            functions: functions,
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
                    }
                    notElementRefactoring.push(notEelement)
                }
            }
        });
        const notElementsRefactorings = notElementRefactoring.map(refactoring => {
            let text = generateComponent(refactoring.imports, refactoring.mounts, refactoring.functions, refactoring.stringRefactoring);
            return (
                <React.Fragment>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={counter.toString()}>
                                {refactoring.name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={counter.toString()}>
                            <Card.Body>
                                <CodeBlock
                                    text={text}
                                    language="jsx"
                                    theme={dracula}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <hr className="m-0"></hr>
                </React.Fragment>
            )
        });
        const normalRefactorings = singleElementRefactoring.map(refactoring => {
            counter++;
            let text = generateComponent(refactoring.imports, refactoring.functions, refactoring.stringElement);
            return (
                <React.Fragment>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={counter.toString()}>
                                {refactoring.name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={counter.toString()}>
                            <Card.Body>
                                <CodeBlock
                                    text={text}
                                    language="jsx"
                                    theme={dracula}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <hr className="m-0"></hr>
                </React.Fragment>
            )
        });
        const formRefactorings = formElementRefactoring.map((refactoring, i) => {
            counter++;
            let text = generateComponent(refactoring.imports, refactoring.mounts, refactoring.functions, refactoring.stringFormElement);
            return (
                <React.Fragment>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={counter.toString()}>
                                Form #{i + 1}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={counter.toString()}>
                            <Card.Body>
                                <CodeBlock
                                    text={text}
                                    language="jsx"
                                    theme={dracula}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <hr className="m-0"></hr>
                </React.Fragment>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    <h5 className='text-center col-12'>Refactorings Code</h5>
                </div>
                <Accordion>
                    {formRefactorings}
                    {normalRefactorings}
                    {notElementsRefactorings}
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