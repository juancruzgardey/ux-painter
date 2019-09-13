import React from 'react';
import RefactoringOnElementView from "./RefactoringOnElementView";
import PageSelector from "../PageSelector";
import XPathInterpreter from "../refactorings/XPathInterpreter";
import RefactoringConfigurationView from "./RefactoringConfigurationView";

class AddFormValidationView extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
        this.pageSelector = new PageSelector(this);
        this.xpathInterpreter = new XPathInterpreter();
        this.state = {requiredInputs: [], selectingInputError: false};
        this.pageSelector.enableElementSelection({"targetElementSelector": "input, select"});
        this.pageSelector.preventDomElementsBehaviour();
    }

    onElementSelected(anElement) {
        this.pageSelector.addRequiredField(anElement);
        const elementXpath = this.xpathInterpreter.getPath(anElement, this.refactoring.getElement())[0];
        this.state.requiredInputs.push(elementXpath);
        this.setState({requiredInputs: this.state.requiredInputs});
        this.refactoring.setRequiredInputXpaths(this.state.requiredInputs);
    }

    onBack() {
        this.removeRequiredFieldsSelection();
        this.pageSelector.restoreDomElementsBehaviour();
    }

    onNext() {
        if (this.state.requiredInputs.length > 0) {
            this.removeRequiredFieldsSelection();
            this.pageSelector.restoreDomElementsBehaviour();
            return true;
        }
        this.setState({selectingInputError:true});
        return false;
    }

    removeRequiredFieldsSelection() {
        this.state.requiredInputs.map(inputXpath => {
            this.pageSelector.removeRequiredField(this.xpathInterpreter.getSingleElementByXpath(inputXpath, this.refactoring.getElement()));
        });
    }

    render() {
        const me = this;
        let requiredInputs = this.state.requiredInputs.map(function (requiredInputXpath) {
            return <li>{me.getElementLabel(requiredInputXpath)}</li>
        });
        return (
            <RefactoringConfigurationView refactoring={this.refactoring} description={'Select the required inputs in the form'}
            child={this}>
                <div className={'form-group'}>
                    {this.state.selectingInputError && (<p className={'text-danger'}>At least one input must be selected</p>)}
                    <ul>
                        {requiredInputs}
                    </ul>
                </div>
            </RefactoringConfigurationView>
        )
    }

    getElementLabel(elementXpath) {
        const element = new XPathInterpreter().getSingleElementByXpath(elementXpath,this.refactoring.getElement());
        let labels = document.querySelectorAll("label[for='" + element.id + "'], label[for='" + element.getAttribute("name") + "']");
        return labels.length > 0?labels[0].innerText: element.tagName.toLowerCase();
    }

}

export default AddFormValidationView;