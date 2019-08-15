import React from 'react';
import RefactoringView from "./RefactoringView";
import PageSelector from "../PageSelector";
import XPathInterpreter from "../refactorings/XPathInterpreter";

class DistributeMenuView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bulkActionXpath: '',
            selectingBulkAction: false,
            itemsXpath: this.props.refactoring.getItemXpathList()
        };

        this.xpathInterpreter = new XPathInterpreter();

        this.pageSelector = new PageSelector(this);
        this.enableBulkActionSelection = this.enableBulkActionSelection.bind(this);
        this.enableItemSelection = this.enableItemSelection.bind(this);

    }

    enableElementSelection(targetSelector) {
        this.pageSelector.enableElementSelection({
            "scrapperClass": "QuerySelectorScrapper",
            "targetElementSelector": targetSelector,
            "onElementSelection": "onElementSelection",
            "justFullPath": true
        });
        this.pageSelector.preventDomElementsBehaviour();
    }

    enableBulkActionSelection() {
        this.setState({selectingBulkAction: true});
        this.enableElementSelection("a,button, input[type='submit']");
    }

    enableItemSelection() {
        this.enableElementSelection("div, tr, li");
    }

    onElementSelected(anElement) {
        const elementXpath = this.xpathInterpreter.getPath(anElement, this.props.refactoring.getContext())[0];
        if (this.state.selectingBulkAction) {
            this.props.refactoring.setBulkActionXpath(elementXpath);
            this.setState({selectingBulkAction: false, bulkActionXpath: elementXpath});
        }
        else {
            this.setState(state => {state.itemsXpath.push(elementXpath);return state})
        }
        this.pageSelector.restoreDomElementsBehaviour();
    }

    render() {
        const itemList = this.state.itemsXpath.map(itemXpath => {
            return <li>{itemXpath}</li>
        });
        return (
        <RefactoringView refactoring={this.props.refactoring}>
            <div className={'form-group'}>
                <p>Bulk Action <a className={'btn btn-link'} onClick={this.enableBulkActionSelection}>Select</a></p>
                <p>Current Element: {this.state.bulkActionXpath}</p>
            </div>
            <div className={'form-group'}>
                <p>Items <a className={'btn btn-link'} onClick={this.enableItemSelection}>Add</a></p>
                <ul>
                    {itemList}
                </ul>
            </div>
        </RefactoringView>

        )
    }

}

export default DistributeMenuView;