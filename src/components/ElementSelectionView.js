import React from 'react';
import PageSelector from '../PageSelector';
import XPathInterpreter from '../refactorings/XPathInterpreter';
import {goBack, goTo} from 'route-lite';
import RefactoringPreview from "./RefactoringPreview";
import ElementSelectionGif from "./ElementSelectionGif";

class ElementSelectionView extends React.Component {

    constructor (props) {
        super(props);
        this.state = {elementXpath: "", errorInSelection: false, elementSelected: false};
        this.refactoring = this.props.refactoring;
        this.pageSelector = new PageSelector (this);
        this.pageSelector.enableElementSelection({
            "targetElementSelector": this.refactoring.targetElements(),
        });
        this.pageSelector.preventDomElementsBehaviour();

        this.disableElementSelection = this.disableElementSelection.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }


    onElementSelected(anElement) {
        if (this.refactoring.getElement()) {
            this.pageSelector.removeSelectionClass(this.refactoring.getElement(), this.pageSelector.selectionClass);
        }
        else {
            this.setState({elementSelected:true});
        }
        const elementXpath = (new XPathInterpreter()).getPath(anElement, document.body)[0];
        this.setState({elementXpath: elementXpath});
        this.refactoring.setElementXpath(elementXpath);
        this.refactoring.setElement(anElement);
        this.pageSelector.addSelectionClass(anElement, this.pageSelector.selectionClass);
        const me = this;
    }

    disableElementSelection() {
        this.pageSelector.restoreDomElementsBehaviour();
    }

    handleBack() {
        this.disableElementSelection();
        this.pageSelector.removeSelectedElementsHighlighting();
        goBack();
    }

    handleNext() {
        if (this.state.elementXpath) {
            this.disableElementSelection();
            if (!this.refactoring.checkPreconditions()) {
                goTo(this.refactoring.getView(), {"refactoring": this.refactoring});
            }
            else {
                goTo(RefactoringPreview, {"refactoring": this.refactoring});
            }
        }
        else {
            this.setState({errorInSelection:true});
        }
    }

    render () {
        return (
        <div className={"container"}>
            <div className={"row col-12"}>
                <h5 className={'text-center'}>{this.refactoring.constructor.asString()}</h5>
            </div>
            <div className={"row col-12"}>
                <div className={"form-group"}>
                    <div className={"alert alert-primary"} role="alert">
                        {!this.props.instruction && 'Select an element in the page'}
                        {this.props.instruction}
                    </div>
                    {this.state.elementSelected && (
                        <div className={"alert alert-warning"} role="alert">
                            Done! change the selection or continue to the next step
                        </div>
                    )}
                </div>
            </div>
            {this.state.errorInSelection && !this.state.elementSelected && (
                <div className={"alert alert-danger"} role="alert">
                    Element must be selected to continue
                </div>
            )}
            <ElementSelectionGif/>
            <div className={'row uxpainter-long-row'}>
                <div className={"col-4"}>
                    <a className={'btn btn-secondary'} href={"#"} onClick={() => this.handleBack()}>Back</a>
                </div>
                <div className={"col-4"}>
                    <a onClick={this.handleNext} href={"#"} className={'btn btn-warning'}>Next</a>
                </div>
            </div>
        </div>

        );
    }


}

export default ElementSelectionView;