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
            selectingItem: false,
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
        this.setState({selectingItem: true});
        this.enableElementSelection("div, tr, li");
    }

    onElementSelected(anElement) {
        this.pageSelector.addSelectionClass(anElement);
        const elementXpath = this.xpathInterpreter.getPath(anElement, this.props.refactoring.getContext())[0];
        if (this.state.selectingBulkAction) {
            if (this.props.refactoring.getBulkAction()) {
                this.pageSelector.removeSelectionClass(this.props.refactoring.getBulkAction());
            }
            this.props.refactoring.setBulkActionXpath(elementXpath);
            this.setState({selectingBulkAction: false, bulkActionXpath: elementXpath});
        }
        else {
            let items = this.props.refactoring.findSimilarItems(anElement);
            this.setState(state => {
                items.map(item => {
                    this.pageSelector.addSelectionClass(item);
                    state.itemsXpath.push(this.xpathInterpreter.getPath(item, this.props.refactoring.getContext())[0]);
                });
                state.selectingItem = false;
                return state
            });
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
                <h6>Bulk Action</h6>
                {!this.state.selectingBulkAction &&
                    (<a className={'btn btn-link'} onClick={this.enableBulkActionSelection}>Select</a>)}
                {this.state.selectingBulkAction && (
                    <span className={'uxpainter-message'}>Select an Action</span>
                )}
            </div>
            <div className={'form-group'}>
                <h6>Items</h6>
                {!this.state.selectingItem && (<a className={'btn btn-link'} onClick={this.enableItemSelection}>Add</a>)}
                {this.state.selectingItem && (
                    <span className={'uxpainter-message'}>Select an Item</span>
                )}
            </div>
        </RefactoringView>

        )
    }

}

export default DistributeMenuView;