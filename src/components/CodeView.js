import React from 'react';
import { Link } from "route-lite";
import VersionListView from "./VersionListView";
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";
import XPathInterpreter from "../refactorings/XPathInterpreter";
import { generateComponent, generateStyle, generateArray } from "../js/helpers";

class CodeView extends React.Component {

    render() {
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
                        if (formElementRefactoring[j].xPath == formElementXpath) {
                            existsInFormElementRefactoring = true;
                            elementIndexInFormElementRefactoring = j;
                            break;
                        }
                    }
                    let formElement = new XPathInterpreter().getSingleElementByXpath(formElementXpath, document.body);
                    if (existsInFormElementRefactoring) {
                        formElementRefactoring[elementIndexInFormElementRefactoring].imports = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].imports, refactoring.imports);
                        formElementRefactoring[elementIndexInFormElementRefactoring].mounts = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].mounts, refactoring.mounts);
                        formElementRefactoring[elementIndexInFormElementRefactoring].functions = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].functions, refactoring.functions);
                        formElementRefactoring[elementIndexInFormElementRefactoring].styles = generateArray(formElementRefactoring[elementIndexInFormElementRefactoring].styles, refactoring.styles);
                    }
                    else {
                        imports = generateArray([], refactoring.imports);
                        mounts = generateArray([], refactoring.mounts);
                        functions = generateArray([], refactoring.functions);
                        styles = generateArray([], refactoring.styles);
                        const form = {
                            xPath: formElementXpath,
                            stringFormElement: formElement.outerHTML,
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
                    elementClone.style = null;
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
                        const elementData = {
                            name: refactoring.constructor.asString(),
                            xPath: refactoring.getElementXpath(),
                            stringElement: elementClone.outerHTML,
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
                    let notEelement = {
                        name: refactoring.constructor.asString(),
                        stringRefactoring: refactoring.stringRefactoring(elementWord, randomInt),
                        imports: refactoring.imports(),
                        mounts: refactoring.mounts(elementWord, randomInt),
                        functions: refactoring.functions(elementWord, randomInt),
                        styles: refactoring.styles(elementWord, randomInt),
                    }
                    notElementRefactoring.push(notEelement)
                }
            }
            //     let style = (refactoring.getStyle()).targetElement;
            //     let stringStyle = "";
            //     const styleToString = (style) => {
            //         return Object.keys(style).reduce((acc, key) => (
            //             acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
            //         ), '');
            //     };
            //     if (style != null)
            //         stringStyle += styleToString(style);
            //     let randomInt = Math.floor(Math.random() * 9999) + 1;
            //     let auxString = "example";
            //     let code = null;
            //     let imports = null;
            //     if (typeof refactoring.code === "function") {
            //         code = refactoring.code(auxString, randomInt);
            //     }
            //     if (typeof refactoring.imports === "function") {
            //         imports = refactoring.imports();
            //     }
            //     if (refactoring.isOnElement()) {
            //         let element = refactoring.getElement();
            //         element.setAttribute("id", auxString + randomInt.toString());
            //         if (refactoring.getElementXpath().includes("form")) {
            //             if (typeof refactoring.hasInside === "function") {
            //                 let formElementXpath = refactoring.getElementXpath();
            //                 if (!formRef.includes(formElementXpath))
            //                     formRef.push(formElementXpath);
            //                 const findI = (auxelement) => auxelement == formElementXpath;
            //                 let indexaux = formRef.findIndex(findI);
            //                 let requiredImputs = refactoring.getRequiredInputs();
            //                 let randomIntCollection = [];
            //                 for (let i = 0; i < requiredImputs.length; i++) {
            //                     let randomIntAux = Math.floor(Math.random() * 9999) + 1;
            //                     requiredImputs[i].setAttribute("id", auxString + randomIntAux.toString());
            //                     randomIntCollection.push(randomIntAux);
            //                 }
            //                 let functions = refactoring.functions(auxString, randomIntCollection, randomInt);
            //                 if (formRefFunctions[indexaux] == null)
            //                     formRefFunctions[indexaux] = []
            //                 formRefFunctions[indexaux].push(functions);
            //                 if (formRefCodes[indexaux] == null)
            //                     formRefCodes[indexaux] = []
            //                 formRefCodes[indexaux].push(code);
            //                 if (typeof refactoring.imports === "function") {
            //                     if (formRefImports[indexaux] == null)
            //                         formRefImports[indexaux] = [];
            //                     if (!formRefImports[indexaux].includes(imports))
            //                         formRefImports[indexaux].push(imports);
            //                 }
            //             }
            //             else {
            //                 let separated = refactoring.getElementXpath().split("/");
            //                 for (let i = 0; i < separated.length; i++) {
            //                     if (separated[i].includes('form')) {
            //                         let formIndex = refactoring.getElementXpath().indexOf(separated[i]);
            //                         let formElementXpath = refactoring.getElementXpath().substring(0, formIndex + separated[i].length);
            //                         if (!formRef.includes(formElementXpath))
            //                             formRef.push(formElementXpath)
            //                         const findI = (auxelement) => auxelement == formElementXpath;
            //                         let indexaux = formRef.findIndex(findI);
            //                         if (typeof refactoring.code === "function") {
            //                             if (formRefCodes[indexaux] == null)
            //                                 formRefCodes[indexaux] = []
            //                             formRefCodes[indexaux].push(code);
            //                         }
            //                         if (typeof refactoring.imports === "function") {
            //                             if (formRefImports[indexaux] == null)
            //                                 formRefImports[indexaux] = [];
            //                             if (!formRefImports[indexaux].includes(imports))
            //                                 formRefImports[indexaux].push(imports);
            //                         }
            //                         break;
            //                     }
            //                 }
            //             }
            //         }
            //         else {
            //             let aux = {
            //                 name: refactoring.constructor.asString(),
            //                 xPath: refactoring.getElementXpath(),
            //                 code: [],
            //                 imports: [],
            //                 styles: []
            //             }
            //             if (!normalXpaths.includes(refactoring.getElementXpath())) {
            //                 normalXpaths.push(refactoring.getElementXpath());
            //                 if (code != null)
            //                     aux.code.push(code)
            //                 if (imports != null)
            //                     aux.imports.push(imports)
            //                 if (stringStyle != "")
            //                     aux.styles.push(generateStyle(auxString, randomInt, stringStyle));
            //                 normalRef.push(aux);
            //             }
            //             else {
            //                 for (let i = 0; i < normalRef.length; i++) {
            //                     if (normalRef[i].xPath == refactoring.getElementXpath()) {
            //                         normalRef[i].name += " & " + aux.name;
            //                         if (code != null) {
            //                             normalRef[i].code.push(code);
            //                         }
            //                         if (imports != null) {
            //                             normalRef[i].imports.push(imports)
            //                         }
            //                         if (stringStyle != "") {
            //                             stringStyle += generateStyle(auxString, randomInt, stringStyle);
            //                             normalRef[i].styles.push(stringStyle);
            //                         }
            //                         break;
            //                     }
            //                 }
            //             }
            //         }
            //     }
            //     else {
            //         let aux = {
            //             name: refactoring.constructor.asString(),
            //             functions: refactoring.functions(auxString, randomInt),
            //             mount: refactoring.mount(auxString, randomInt),
            //             imports: refactoring.imports(),
            //             render: code,
            //             style: generateStyle(auxString, randomInt, refactoring.cssText)
            //         }
            //         notElements.push(aux)
            //     }
        });
        console.log(singleElementRefactoring)
        console.log(formElementRefactoring)
        console.log(notElementRefactoring)
        // const notElementsRefactorings = notElements.map(refactoring => {
        //     let imports = refactoring.imports;
        //     let text = generateComponent(imports, refactoring.mount, refactoring.render, refactoring.functions)
        //     return (
        //         <React.Fragment>
        //             <div className='row'>
        //                 <p className="col-12">{refactoring.name}:</p>
        //             </div>
        //             <div className="row">
        //                 <div className="col-12 mb-3">
        //                     <CodeBlock
        //                         text={text}
        //                         language="javascript"
        //                         theme={dracula}
        //                     />
        //                 </div>
        //             </div>
        //             <div className='row'>
        //                 <p className="col-12">Estilo:</p>
        //             </div>
        //             <div className="row">
        //                 <div className="col-12 mb-3">
        //                     <CodeBlock
        //                         text={refactoring.style}
        //                         language="javascript"
        //                         theme={dracula}
        //                     />
        //                 </div>
        //             </div>
        //             <hr className="m-0"></hr>
        //         </React.Fragment>
        //     )
        // });
        // const normalRefactorings = normalRef.map(refactoring => {
        //     let style = "";
        //     if (refactoring.styles.length != 0) {
        //         refactoring.styles.map(style2 => {
        //             style += style2;
        //         })
        //     }
        //     let element = new XPathInterpreter().getSingleElementByXpath(refactoring.xPath, document.body);
        //     let theCode = "";
        //     let imports = "";
        //     let functions = "";
        //     if (!refactoring.imports.length == 0) {
        //         refactoring.imports.map(imports2 => {
        //             imports += imports2 + "\n";
        //         })
        //     }
        //     if (!refactoring.code.length == 0) {
        //         refactoring.code.map(code => {
        //             theCode += code + "\n"
        //         })
        //     }
        //     let text = generateComponent(imports, theCode, element.outerHTML, functions);
        //     return (
        //         <React.Fragment>
        //             <div className='row'>
        //                 <p className="col-12">{refactoring.name}:</p>
        //             </div>
        //             <div className="row">
        //                 <div className="col-12 mb-3">
        //                     <CodeBlock
        //                         text={text}
        //                         language="jsx"
        //                         theme={dracula}
        //                     />
        //                 </div>
        //             </div>
        //             {style != "" ?
        //                 <React.Fragment>
        //                     <div className='row'>
        //                         <p className="col-12">Estilo:</p>
        //                     </div>
        //                     <div className="row">
        //                         <div className="col-12 mb-3">
        //                             <CodeBlock
        //                                 text={style}
        //                                 language="javascript"
        //                                 theme={dracula}
        //                             />
        //                         </div>
        //                     </div>
        //                 </React.Fragment>
        //                 : null}
        //             <hr className="m-0"></hr>
        //         </React.Fragment>
        //     )
        // });
        // const formRefactorings = formRef.map((refactoring, i) => {
        //     let element = new XPathInterpreter().getSingleElementByXpath(refactoring, document.body);
        //     let theCode = "";
        //     let imports = "";
        //     let functions = "";
        //     if (formRefCodes[i] != null) {
        //         formRefCodes[i].map(codaso => {
        //             theCode += codaso + "\n"
        //         })
        //     }
        //     if (formRefImports[i] != null) {
        //         formRefImports[i].map(imports2 => {
        //             imports += imports2 + "\n"
        //         })
        //     }
        //     if (formRefFunctions[i] != null) {
        //         formRefFunctions[i].map(functions2 => {
        //             functions += functions2 + "\n"
        //         })
        //     }
        //     let text = generateComponent(imports, theCode, element.outerHTML, functions);
        //     return (
        //         <React.Fragment>
        //             <div className='row'>
        //                 <p className="col-12">Form #{i + 1}:</p>
        //             </div>
        //             <div className="row">
        //                 <div className="col-12 mb-3">
        //                     <CodeBlock
        //                         text={text}
        //                         language="jsx"
        //                         theme={dracula}
        //                     />
        //                 </div>
        //             </div>
        //             <hr className="m-0"></hr>
        //         </React.Fragment>
        //     )
        // });
        return (
            <div className="container">
                <div className="row">
                    <h5 className='text-center col-12'>Refactorings Code</h5>
                </div>
                {/* {notElementsRefactorings}
                {normalRefactorings}
                {formRefactorings} */}
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