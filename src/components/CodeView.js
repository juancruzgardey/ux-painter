import React from 'react';
import { Link } from "route-lite";
import VersionListView from "./VersionListView";
import { CodeBlock, dracula } from "react-code-blocks";
import XPathInterpreter from "../refactorings/XPathInterpreter";
import { generateComponent, generateArray, generateRequiredFormComponent, generateRandomNumber } from "../js/helpers";
import { Accordion, Card, Button } from 'react-bootstrap';

var HTMLtoJSX = require('htmltojsx');

class CodeView extends React.Component {
    render() {
        let elementWord = "example";
        var counter = 0;
        var converter = new HTMLtoJSX({
            createClass: false,
            outputClassName: 'TestComponent'
        });
        let singleElementRefactoring = [];
        let formElementRefactoring = [];
        let notElementRefactoring = [];

        function addStr(str, index, stringToAdd) {
            return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
        }



        window.refactoringManager.getCurrentVersion().getRefactorings().map(refactoring => {
            let imports;
            let functions;
            let randomInt = generateRandomNumber();
            if (refactoring.isOnElement()) {            //verifico que se trate de un refactoring que afecte al menos un elemento
                let element = refactoring.getElement();
                if (refactoring.getElementXpath().includes("form")) {           //verifico si se trata de un refactoring que actua sobre un formulario
                    if (refactoring.hasInside()) {
                        let formExistInside = false;
                        let indexIfExists = null;
                        let bodyClone = document.body.cloneNode(true);
                        let formElement = new XPathInterpreter().getSingleElementByXpath(refactoring.getElementXpath(), bodyClone);
                        for (let i = 0; i < formElementRefactoring.length; i++) {
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
                        //formElement.setAttribute("id", elementWord + randomInt.toString());     //para guardar
                        let requiredInputsXpaths = refactoring.getRequiredInputXpaths();
                        if (formExistInside) {
                            let elements = [];
                            requiredInputsXpaths.map(xpath => {
                                if (!formElementRefactoring[indexIfExists].requiredInputsXpaths.includes(xpath)) {
                                    let modXpath = refactoring.getElementXpath() + xpath.substring(2);
                                    let auxRandomInt = generateRandomNumber();
                                    let auxElement = new XPathInterpreter().getSingleElementByXpath(xpath, formElement);
                                    elements.push({ elementXpath: modXpath, numberId: auxRandomInt });
                                    auxElement.setAttribute("id", elementWord + auxRandomInt.toString());
                                    formElementRefactoring[indexIfExists].requiredInputs.push(elementWord + auxRandomInt.toString());
                                    formElementRefactoring[indexIfExists].requiredInputsXpaths.push(xpath)
                                }
                            })
                            formElementRefactoring[indexIfExists].elementsModified = generateArray(formElementRefactoring[indexIfExists].elementsModified, elements);
                            formElementRefactoring[indexIfExists].imports = generateArray(formElementRefactoring[indexIfExists].imports, refactoring.imports());
                            formElementRefactoring[indexIfExists].stringFormElement = converter.convert(formElement.outerHTML);
                            formElementRefactoring[indexIfExists].required = true;
                            console.log(formElementRefactoring[indexIfExists].elementsModified[0])
                            console.log(formElementRefactoring[indexIfExists].elementsModified[1])
                            console.log(formElementRefactoring[indexIfExists].imports)
                            console.log(formElementRefactoring[indexIfExists].functions)
                            console.log(formElementRefactoring[indexIfExists].requiredInputs)
                            console.log(formElementRefactoring[indexIfExists].requiredInputsXpaths)
                        }
                        else {
                            let elements = [];
                            let requiredInputs = []
                            let requiredInputsXpaths = []
                            requiredInputsXpaths.map(xpath => {
                                let auxRandomInt = generateRandomNumber();
                                let auxElement = new XPathInterpreter().getSingleElementByXpath(xpath, formElement);
                                let modXpath = refactoring.getElementXpath() + xpath.substring(2);
                                auxElement.setAttribute("id", elementWord + auxRandomInt.toString());
                                requiredInputs.push(elementWord + auxRandomInt.toString());
                                elements.push({ elementXpath: modXpath, numberId: auxRandomInt });
                                requiredInputsXpaths.push(xpath)
                            })
                            let elementsModified = generateArray([], elements);
                            imports = generateArray([], refactoring.imports());
                            functions = [];
                            var output = converter.convert(formElement.outerHTML);
                            const form = {
                                formXpath: refactoring.getElementXpath(),
                                elementBody: bodyClone,
                                stringFormElement: output,
                                elementsModified,
                                imports,
                                functions,
                                required: true,
                                requiredInputs,
                                requiredInputsXpaths
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
                                formElementRefactoring[elementIndexInFormElementRefactoring].functions = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].functions, refactoring.functions(elementWord, formElementRefactoring[elementIndexInFormElementRefactoring].elementsModified[indexXpathModified].numberId));
                            }
                            else {
                                elementInClone.setAttribute("id", elementWord + randomInt.toString());
                                // formElementRefactoring[elementIndexInFormElementRefactoring].stringFormElement       COMPROBAR: quizas sea necesario guardar el nuevo elementBody para que se almacene el ultimo setattribute
                                formElementRefactoring[elementIndexInFormElementRefactoring].stringFormElement = converter.convert(formElementInClone.outerHTML);
                                formElementRefactoring[elementIndexInFormElementRefactoring].elementsModified.push({ elementXpath, numberId: randomInt });
                                formElementRefactoring[elementIndexInFormElementRefactoring].functions = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].functions, refactoring.functions(elementWord, randomInt));
                            }
                        }
                        else {
                            let requiredInputsXpaths = []
                            imports = generateArray([], refactoring.imports());
                            functions = generateArray([], refactoring.functions(elementWord, randomInt));
                            let elementsModified = generateArray([], [{ elementXpath, numberId: randomInt }])
                            var output = converter.convert(formElementInClone.outerHTML);
                            const form = {
                                formXpath: formElementXpath,
                                elementBody: bodyClone,
                                stringFormElement: output,
                                elementsModified: elementsModified,
                                imports: imports,
                                functions: functions,
                                required: false,
                                requiredInputs: [],
                                requiredInputsXpaths
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
                        if (refactoring.affectsInput() && (singleElementRefactoring[elementIndexInElementRefactoring].state == null))
                            singleElementRefactoring[elementIndexInElementRefactoring].state = elementWord + randomInt.toString();
                        if (!singleElementRefactoring[elementIndexInElementRefactoring].name.includes(refactoring.constructor.asString()))
                            singleElementRefactoring[elementIndexInElementRefactoring].name += " & " + refactoring.constructor.asString();
                        singleElementRefactoring[elementIndexInElementRefactoring].imports = generateArray(singleElementRefactoring[elementIndexInElementRefactoring].imports, refactoring.imports());
                        singleElementRefactoring[elementIndexInElementRefactoring].functions = generateArray(singleElementRefactoring[elementIndexInElementRefactoring].functions, refactoring.functions(elementWord, singleElementRefactoring[elementIndexInElementRefactoring].numberId));
                    }
                    else {
                        imports = generateArray([], refactoring.imports());
                        functions = generateArray([], refactoring.functions(elementWord, randomInt));
                        if (refactoring.affectsInput())
                            elementClone.setAttribute("id", elementWord + randomInt.toString());
                        var output = converter.convert(elementClone.outerHTML);
                        const elementData = {
                            name: refactoring.constructor.asString(),
                            xPath: refactoring.getElementXpath(),
                            stringElement: output,
                            numberId: randomInt,
                            imports: imports,
                            functions: functions,
                            state: refactoring.affectsInput() ? elementWord + randomInt.toString() : null
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
                    let state = refactoring.state();
                    let notEelement = {
                        name: refactoring.constructor.asString(),
                        stringRefactoring: refactoring.stringRefactoring(),
                        imports: refactoring.imports(),
                        functions: refactoring.functions(),
                        state
                    }
                    notElementRefactoring.push(notEelement)
                }
            }
        });
        const notElementsRefactorings = notElementRefactoring.map(refactoring => {
            let text = generateComponent(refactoring.imports, refactoring.functions, refactoring.stringRefactoring, refactoring.state);
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
            let stateManager = [];
            let outputElement = refactoring.stringElement;
            if (refactoring.state != null) {
                let defValue = "";
                outputElement = "";
                if (refactoring.stringElement.includes("defaultValue=")) {
                    let aux5;
                    let aux4 = refactoring.stringElement.split("defaultValue=\"");
                    if (aux4.length == 1) { //para manejar defaultvalue numerico
                        aux4 = refactoring.stringElement.split("defaultValue=");
                        aux5 = aux4[1].split(" ");
                        aux5[0] = aux5[0].toString();
                    }
                    else {
                        aux5 = aux4[1].split("\"");
                    }
                    defValue = aux5[0];
                }
                let obj = {
                    randomInt: refactoring.state,
                    defValue
                }
                let outCut = refactoring.stringElement.replaceAll("/>", "@@@/>");
                outCut = outCut.split("@@@");
                outCut[0] = addStr(outCut[0], outCut[0].length - 1, " onChange={(e) => set" + refactoring.state + "(e.target.value)} value={" + refactoring.state + "}");
                outCut.forEach((o)=>{
                    outputElement += o;
                })
                stateManager.push(obj);
            }
            let text = generateComponent(refactoring.imports, refactoring.functions, outputElement, stateManager);
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
            let output = refactoring.stringFormElement.replaceAll("<input", "@@@<input");
            let outputCut = output.split("@@@");
            let stateManager = [];
            let outputForm = ""
            outputCut.forEach((val, i) => {
                if (val.includes("<form") && refactoring.required) {
                    let sum = "";
                    val = val.replaceAll(">", "@@@>");
                    let cut = val.split("@@@");
                    cut[0] += " onSubmit={(e) => { onSubmit(e);}}";
                    cut.forEach((c) => {
                        sum += c;
                    })
                    val = sum;
                }
                if (!val.includes("type=\"submit\"") && !val.includes("type=\"reset\"") && !val.includes("<form")) {
                    val = val.replaceAll("/>", "@@@/>");
                    let aux2 = val.split("@@@");
                    aux2.forEach((val2, i2) => {
                        if (i2 == 0) {
                            let randomInt;
                            let defValue = "";
                            if (val2.includes("defaultValue=")) {
                                let aux4 = val2.split("defaultValue=\"");
                                let aux5 = aux4[1].split("\"");
                                defValue = aux5[0];
                            }
                            if (val2.includes(" id=\"")) {
                                let aux3 = val2.split(" id=\"");
                                aux3 = aux3[1].split("\"");
                                randomInt = aux3[0];
                                if (refactoring.requiredInputs.includes(randomInt)) {
                                    if (val2.includes(" style={{")) {
                                        let ind = val2.indexOf(" style={{");
                                        val2 = addStr(val2, ind + 9, "border: " + randomInt + " === \"\" ? \"red solid 1px\" : \"black solid 1px\",");
                                    }
                                    else {
                                        val2 = addStr(val2, val2.length -1, " style={{ border: " + randomInt + " === \"\" ? \"red solid 1px\" : \"black solid 1px\" }}");
                                    }
                                }
                                val2 = addStr(val2, val2.length - 1, " value={" + randomInt + "}");
                            }
                            else {
                                randomInt = elementWord + generateRandomNumber().toString();
                                val2 = addStr(val2, val2.length - 1, " id=\"" + randomInt + "\" value={" + randomInt + "}");
                            }
                            /* if (val2.includes("value=")) {
                                let aux4 = val2.split("value=\"");
                                let aux5 = aux4[1].split("\"");
                                defValue = aux5[0];
                            } */
                            val2 = addStr(val2, val2.length - 1, " onChange={(e) => set" + randomInt + "(e.target.value)}");
                            let obj = {
                                randomInt,
                                defValue
                            }
                            stateManager.push(obj);
                        }
                        outputForm += val2
                    })
                }
                else {
                    outputForm += val
                }
            })
            let text
            if (refactoring.required)
                text = generateRequiredFormComponent(refactoring.imports, refactoring.functions, outputForm, refactoring.requiredInputs, stateManager)
            else
                text = generateComponent(refactoring.imports, refactoring.functions, outputForm, stateManager);
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