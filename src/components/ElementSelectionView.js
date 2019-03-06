import React from 'react';
import PageSelector from '../PageSelector';
import XPathInterpreter from '../refactorings/XPathInterpreter';
import { Link } from 'route-lite';

class ElementSelectionView extends React.Component {

    constructor (props) {
        super(props);
        this.state = {elementXpath: ""};
        this.refactoring = new this.props.refactoring();
        this.pageSelector = new PageSelector (this);
        this.pageSelector.enableElementSelection({
            "scrapperClass": "QuerySelectorScrapper",
            "targetElementSelector": this.refactoring.targetElements(),
            "onElementSelection": "onElementSelection",
            "justFullPath": true
        });
        this.pageSelector.preventDomElementsBehaviour();

        this.disableElementSelection = this.disableElementSelection.bind(this);
    }


    onElementSelected(anElement) {
        const elementXpath = (new XPathInterpreter()).getPath(anElement, document.body)[0];
        this.setState({elementXpath: elementXpath});
        this.refactoring.setElement(elementXpath);
    }

    disableElementSelection() {
        this.pageSelector.restoreDomElementsBehaviour();
    }

    render () {
        return (
        <div>
            <h1>Select an Element</h1>
            <p>Target Element: <span>{this.state.elementXpath}</span></p>
            <Link onClick={this.disableElementSelection} component={this.refactoring.getView()} componentProps={{"refactoring": this.refactoring}}>Continue</Link>
        </div>

        );
    }


}

export default ElementSelectionView;