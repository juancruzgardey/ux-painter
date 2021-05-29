import React from 'react';
import { generateComponent } from "../js/helpers";
import { Accordion, Card, Button } from 'react-bootstrap';
import { CodeBlock, dracula } from "react-code-blocks";

class NotElementsRefactorings extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return(
            this.props.notElementRefactoring.map(refactoring => {
                this.props.counter++;
                let text = generateComponent(refactoring.imports, refactoring.functions, refactoring.stringRefactoring, refactoring.state, refactoring.name);
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

export default NotElementsRefactorings;