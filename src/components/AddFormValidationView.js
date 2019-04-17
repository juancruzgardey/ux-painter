import React from 'react';
import RefactoringOnElementView from "./RefactoringOnElementView";
import PageSelector from "../PageSelector";
import XPathInterpreter from "../refactorings/XPathInterpreter";
import domtoimage from "dom-to-image";

class AddFormValidationView extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
        this.pageSelector = new PageSelector(this);
        this.addRequiredInput = this.addRequiredInput.bind(this);
        this.state = {requiredInputs: []};
    }

    addRequiredInput() {
        this.pageSelector.enableElementSelection({
            "scrapperClass": "QuerySelectorScrapper",
            "targetElementSelector": "input",
            "onElementSelection": "onElementSelection",
            "justFullPath": true
        });
        this.pageSelector.preventDomElementsBehaviour();
    }

    onElementSelected(anElement) {
        const elementXpath = (new XPathInterpreter()).getPath(anElement, document.body)[0];
        this.state.requiredInputs.push(elementXpath);
        this.setState({requiredInputs: this.state.requiredInputs});
        this.refactoring.setRequiredInputXpaths(this.state.requiredInputs);
        this.pageSelector.restoreDomElementsBehaviour();
    }

    render() {
        const me = this;
        let requiredInputs = this.state.requiredInputs.map(function (requiredInputXpath) {
            return <li>{me.getElementLabel(requiredInputXpath)}</li>
        });
        return (
            <RefactoringOnElementView refactoring={this.refactoring}>

                <div className={'form-group'}>
                    <h6 className={'text-center'}>Required Inputs</h6>
                </div>
                <div className={'form-group'}>
                    <button className={'btn btn-light'} onClick={this.addRequiredInput}>Add</button>
                </div>
                <div className={'form-group'}>
                    <ul>
                        {requiredInputs}
                    </ul>
                </div>

            </RefactoringOnElementView>
        )
    }

    getElementLabel(elementXpath) {
        const element = new XPathInterpreter().getSingleElementByXpath(elementXpath,document.body);
        let labels = document.querySelectorAll("label[for='" + element.id + "'], label[for='" + element.getAttribute("name") + "']");
        console.log(labels);
        return labels.length > 0?labels[0].innerText: elementXpath;
    }

}

export default AddFormValidationView;