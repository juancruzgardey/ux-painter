import XPathInterpreter from "../refactorings/XPathInterpreter";
import { generateArray, generateRandomNumber } from "../js/helpers";
var HTMLtoJSX = require('htmltojsx');

export function generateElements(singleElementRefactoring, formElementRefactoring, notElementRefactoring, elementWord) {
    var converter = new HTMLtoJSX({
        createClass: false,
        outputClassName: 'TestComponent'
    });
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
                    let requiredInputsXpaths = refactoring.getRequiredInputXpaths();
                    requiredInputsXpaths = new Set(requiredInputsXpaths);
                    requiredInputsXpaths = [...requiredInputsXpaths];
                    if (formExistInside) {
                        let elements = [];
                        requiredInputsXpaths.map(xpath => {
                            if (!formElementRefactoring[indexIfExists].requiredInputsXpaths.includes(xpath)) {
                                let modXpath = refactoring.getElementXpath() + xpath.substring(2);
                                let auxRandomInt = generateRandomNumber();
                                let auxElement = new XPathInterpreter().getSingleElementByXpath(xpath, formElement);
                                let existsInElementsModified = false;
                                formElementRefactoring[indexIfExists].elementsModified.forEach((element) => {
                                    if (element.elementXpath == modXpath) {
                                        existsInElementsModified = true;
                                        auxRandomInt = element.numberId;
                                    }
                                })
                                if (!existsInElementsModified) {
                                    elements.push({ elementXpath: modXpath, numberId: auxRandomInt });
                                    auxElement.setAttribute("id", elementWord + auxRandomInt.toString());
                                }
                                formElementRefactoring[indexIfExists].requiredInputs.push(elementWord + auxRandomInt.toString());
                                formElementRefactoring[indexIfExists].requiredInputsXpaths.push(xpath)
                            }
                        })
                        formElementRefactoring[indexIfExists].elementsModified = generateArray(formElementRefactoring[indexIfExists].elementsModified, elements);
                        formElementRefactoring[indexIfExists].imports = generateArray(formElementRefactoring[indexIfExists].imports, refactoring.imports());
                        formElementRefactoring[indexIfExists].stringFormElement = converter.convert(formElement.outerHTML);
                        formElementRefactoring[indexIfExists].required = true;
                    }
                    else {
                        let elements = [];
                        let requiredInputs = []
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
}