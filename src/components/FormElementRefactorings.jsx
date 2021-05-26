import React from 'react';
import { generateComponent, addStr, generateRandomNumber, generateRequiredFormComponent } from "../js/helpers";
import { Accordion, Card, Button } from 'react-bootstrap';
import { CodeBlock, dracula } from "react-code-blocks";

class FormElementRefactorings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            this.props.formElementRefactoring.map((refactoring, i) => {
                this.props.counter++;
                let output = refactoring.stringFormElement.replaceAll("<input", "@@@<input");
                let outputCut = output.split("@@@");
                let stateManager = [];
                let outputForm = ""
                let formName = null;
                let text;
                let formNum = (i + 1).toString();
                outputCut.forEach((val, i) => {
                    if (val.includes(" name=") && val.includes("<form")) {
                        let formNameAux = val.split(" name=\"");
                        formNameAux = formNameAux[1].split("\"");
                        formName = formNameAux[0];
                    }
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
                                    randomInt = this.props.elementWord + generateRandomNumber().toString();
                                    val2 = addStr(val2, val2.length - 1, " id=\"" + randomInt + "\" value={" + randomInt + "}");
                                }
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
                if (refactoring.required)
                    text = generateRequiredFormComponent(refactoring.imports, refactoring.functions, outputForm, refactoring.requiredInputs, stateManager)
                else
                    text = generateComponent(refactoring.imports, refactoring.functions, outputForm, stateManager, "Form ");
                return (
                    <React.Fragment>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={this.props.counter.toString()}>
                                    {formName? formName : "Form #" + formNum}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={this.props.counter.toString()}>
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
            })
        )
    }
}

export default FormElementRefactorings;