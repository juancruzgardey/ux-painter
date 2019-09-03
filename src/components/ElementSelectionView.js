import React from 'react';
import PageSelector from '../PageSelector';
import XPathInterpreter from '../refactorings/XPathInterpreter';
import {goBack, Link} from 'route-lite';

class ElementSelectionView extends React.Component {

    constructor (props) {
        super(props);
        this.state = {elementXpath: ""};
        this.refactoring = this.props.refactoring;
        this.pageSelector = new PageSelector (this);
        this.pageSelector.enableElementSelection({
            "targetElementSelector": this.refactoring.targetElements(),
        });
        this.pageSelector.preventDomElementsBehaviour();

        this.disableElementSelection = this.disableElementSelection.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.targetElementImage = React.createRef();
    }


    onElementSelected(anElement) {
        if (this.refactoring.getElement()) {
            this.pageSelector.removeSelectionClass(this.refactoring.getElement(), this.pageSelector.selectionClass);
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

    render () {
        return (
        <div className={"row"}>
            <div className={"col-md-12"}>
                <h2>Select an Element</h2>
                <div className={'form-group'}>
                    <Link onClick={this.disableElementSelection} className={'btn btn-warning'} component={this.refactoring.getView()} componentProps={{"refactoring": this.refactoring}}>Continue</Link>
                </div>
                <div className={'form-group'}>
                    <Link className={'btn btn-secondary'} onClick={() => this.handleBack()}>Back</Link>
                </div>
            </div>
        </div>

        );
    }


}

export default ElementSelectionView;