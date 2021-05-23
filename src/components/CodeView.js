import React from 'react';
import { Link } from "route-lite";
import VersionListView from "./VersionListView";
import { CodeBlock, dracula } from "react-code-blocks";
import XPathInterpreter from "../refactorings/XPathInterpreter";
import { generateComponent, generateArray, generateRequiredComponent } from "../js/helpers";
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

        function addStr(str, index, stringToAdd) {
            return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
        }



        window.refactoringManager.getCurrentVersion().getRefactorings().map(refactoring => {
            let imports;
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
                                        auxElement.setAttribute("id", elementWord + randomIntExists.toString());
                                        formElementRefactoring[indexIfExists].requiredInputs.push(elementWord + randomIntExists.toString());
                                    }
                                    else {
                                        let auxRandomInt = Math.floor(Math.random() * 9999) + 1;
                                        elements.push({ elementXpath: modXpath, numberId: auxRandomInt });
                                        auxElement.setAttribute("id", elementWord + auxRandomInt.toString());
                                        formElementRefactoring[indexIfExists].requiredInputs.push(elementWord + auxRandomInt.toString());
                                    }
                                    formElementRefactoring[indexIfExists].requiredInputsXpaths.push(xpath)
                                }
                            })
                            formElementRefactoring[indexIfExists].elementsModified = generateArray(formElementRefactoring[indexIfExists].elementsModified, elements);
                            formElementRefactoring[indexIfExists].imports = generateArray(formElementRefactoring[indexIfExists].imports, refactoring.imports());
                            formElementRefactoring[indexIfExists].stringFormElement = converter.convert(formElement.outerHTML);
                            formElementRefactoring[indexIfExists].required = true
                        }
                        else {
                            let elements = [];
                            let requiredInputs = []
                            let requiredInputsXpaths = []
                            requiredInputsXpaths.map(xpath => {
                                let auxRandomInt = Math.floor(Math.random() * 9999) + 1;
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
                else {  //FUNCIONANDO
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
                        console.log(output);
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
            else {  //IGNORAMOS
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
        const formRefactorings = 
        console.log(formElementRefactoring)
        formElementRefactoring.map((refactoring, i) => {
            counter++;

            let output = refactoring.stringFormElement.replaceAll("<input", "@@@<input");
            let test = output.split("@@@");
            let aux = [];
            let suma = ""
            test.forEach((val, i) => {
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
                                        console.log(val2)
                                        console.log(ind)
                                        val2 = addStr(val2, ind + 9, "border: " + randomInt + " === \"\" ? \"red solid 1px\" : \"black solid 1px\",")
                                    }
                                }
                                val2 = addStr(val2, val2.length - 1, " value={" + randomInt + "}");
                            }
                            else {
                                randomInt = "ejemplo123" //	randomint
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
                            aux.push(obj);
                        }
                        suma += val2
                    })
                }
                else {
                    suma += val
                }
            })
            let text
            if (refactoring.required)
                text = generateRequiredComponent(refactoring.imports, refactoring.functions, suma, refactoring.requiredInputs, aux)
            else
                text = generateComponent(refactoring.imports, refactoring.functions, suma);
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