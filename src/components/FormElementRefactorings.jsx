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
                var outputCut = output.split("@@@");
                var formName = null;
                let text;
                let formNum = (i + 1).toString();
                let data = formElementModify(refactoring,outputCut,formName);
                if (refactoring.required)
                    text = generateRequiredFormComponent(refactoring.imports, refactoring.functions, data.outputForm, refactoring.requiredInputs, data.stateManager)
                else
                    text = generateComponent(refactoring.imports, refactoring.functions, data.outputForm, data.stateManager, "Form ");
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