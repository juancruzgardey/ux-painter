import React from "react";
import RefactoringConfigurationView from "./RefactoringConfigurationView";
import PageSelector from "../PageSelector";
import XPathInterpreter from "../refactorings/XPathInterpreter";

class SplitPageLinksView extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
        this.pageSelector = new PageSelector(this);
        this.xpathInterpreter = new XPathInterpreter();
        this.state = {errorInSelection: false};
    }

    componentDidMount() {
        this.pageSelector.enableElementSelection({
            targetElementSelector: this.pageSelector.getAllVisibleDomElementsSelector()
        });
        this.pageSelector.preventDomElementsBehaviour();
    }

    onElementSelected(element) {
        this.pageSelector.addSelectionClass(element, this.pageSelector.borderBottomSelectionClass);
        this.refactoring.setSectionListContainerXpath(this.xpathInterpreter.getPath(element, this.refactoring.getContext())[0]);
    }

    disableElementSelection() {
        this.pageSelector.restoreDomElementsBehaviour();
    }

    onBack() {
        this.disableElementSelection();
    }

    onNext() {
        if (this.refactoring.getSectionListContainer()) {
            this.disableElementSelection();
            return true;
        }
        else {
            this.setState({errorInSelection:true});
            return false;
        }
    }

    render () {
        return (
            <RefactoringConfigurationView child={this} refactoring={this.refactoring} description={'Define the location of the section links'}>
                <div className={'form-group'}>
                    <p className={'uxpainter-message'}>Select an element in the page in which the links' list to show each section will be added</p>
                </div>
                {this.state.errorInSelection && (
                    <div className={'form-group'}>
                        <p className={'text-danger'}>Element must be selected to continue</p>
                    </div>
                )}
            </RefactoringConfigurationView>
        )
    }
}

export default SplitPageLinksView;