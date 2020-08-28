import React from 'react';
import RefactoringConfigurationView from "./RefactoringConfigurationView";
import PageSelector from "../PageSelector";
import XPathInterpreter from "../refactorings/XPathInterpreter";

class DistributeMenuView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bulkActionXpath: '',
            selectingBulkAction: false,
            selectingItem: false,
            selectingActivationItem: false,
            itemsXpath: this.props.refactoring.getItemXpathList()
        };

        this.xpathInterpreter = new XPathInterpreter();

        this.pageSelector = new PageSelector(this);
        this.enableBulkActionSelection = this.enableBulkActionSelection.bind(this);
        this.enableItemSelection = this.enableItemSelection.bind(this);

    }

    enableElementSelection(targetSelector, callback) {
        this.pageSelector.enableElementSelection({
            "scrapperClass": "QuerySelectorScrapper",
            "targetElementSelector": targetSelector,
            "onElementSelection": "onElementSelection",
            "justFullPath": true,
            "componentCallback": callback
        });
        this.pageSelector.preventDomElementsBehaviour();
    }

    enableBulkActionSelection() {
        this.setState({selectingBulkAction: true});
        this.enableElementSelection("a,button, input[type='submit']", "onBulkActionSelected");
    }

    onBulkActionSelected(anElement) {
        const elementXpath = this.xpathInterpreter.getPath(anElement, this.props.refactoring.getContext())[0];
        this.pageSelector.addSelectionClass(anElement);
        if (this.props.refactoring.getBulkAction()) {
            this.pageSelector.removeSelectionClass(this.props.refactoring.getBulkAction());
        }
        this.props.refactoring.setBulkActionXpath(elementXpath);
        this.setState({selectingBulkAction: false, bulkActionXpath: elementXpath});
    }

    enableItemSelection() {
        this.setState({selectingItem: true});
        this.enableElementSelection("div, tr, li", "onItemSelected");
    }

    onItemSelected(anElement) {
        this.pageSelector.addSelectionClass(anElement);
        const elementXpath = this.xpathInterpreter.getPath(anElement, this.props.refactoring.getContext())[0];
        let items = this.props.refactoring.findSimilarItems(anElement);
        items.map(item => {
            this.pageSelector.addSelectionClass(item);
        });
        this.pageSelector.restoreDomElementsBehaviour();
        this.enableItemActivationSelection();
    }

    enableItemActivationSelection() {
        this.setState({selectingActivationItem: true});
        this.enableElementSelection("div,a, button,input[type='checkbox']", "onItemActivationSelected");
    }

    onItemActivationSelected(anElement) {
        this.props.refactoring.findItemsActivationLink(anElement);
        const me = this;
        this.props.refactoring.getItemLinks().map(link => {
            me.pageSelector.addSelectionClass(link, me.pageSelector.secondarySelectionClass);
        });
        this.setState({selectingItem: false,selectingActivationItem: false});
        this.pageSelector.restoreDomElementsBehaviour();
    }

    render() {
        const itemList = this.state.itemsXpath.map(itemXpath => {
            return <li>{itemXpath}</li>
        });
        return (
            <RefactoringConfigurationView refactoring={this.props.refactoring}>
                <div className={'form-group'}>
                    <h6>Bulk Action</h6>
                    {!this.state.selectingBulkAction &&
                    (<a className={'btn btn-link'} onClick={this.enableBulkActionSelection}>Select</a>)}
                    {this.state.selectingBulkAction && (
                        <span className={'uxpainter-message'}>Select an Action</span>
                    )}
                </div>
                <div className={'form-group'}>
                    <h6>Items</h6>
                    {!this.state.selectingItem && (
                        <a className={'btn btn-link'} onClick={this.enableItemSelection}>Add</a>)}
                    {this.state.selectingItem && !this.state.selectingActivationItem && (
                        <span className={'uxpainter-message'}>Select an Item</span>
                    )}
                    {this.state.selectingItem && this.state.selectingActivationItem && (
                        <span className={'uxpainter-message'}>Select the link to activate the item</span>
                    )}
                </div>
            </RefactoringConfigurationView>

        )
    }

}

export default DistributeMenuView;