import React from 'react';
import { generateComponent } from "../js/helpers";
import { Accordion, Card, Button } from 'react-bootstrap';
import { CodeBlock, dracula } from "react-code-blocks";
import { addStr } from "../js/helpers";

class SingleElementRefactorings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            this.props.singleElementRefactoring.map(refactoring => {
                this.props.counter++;
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
                    outCut.forEach((o) => {
                        outputElement += o;
                    })
                    stateManager.push(obj);
                }
                let text = generateComponent(refactoring.imports, refactoring.functions, outputElement, stateManager, refactoring.name);
                return (
                    <React.Fragment>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={this.props.counter.toString()}>
                                    {refactoring.name}
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

export default SingleElementRefactorings;