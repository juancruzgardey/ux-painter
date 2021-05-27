import React from 'react';
import { generateComponent, generateRequiredFormComponent } from "../js/helpers";
import { Accordion, Card, Button } from 'react-bootstrap';
import { CodeBlock, dracula } from "react-code-blocks";
import { formElementModify } from "../js/elementMod";

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
                formElementModify(refactoring,outputCut,stateManager,outputForm,formName);
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