import UsabilityRefactoring from "./UsabilityRefactoring";
import DistributeMenuView from "../components/DistributeMenuView";

class DistributeMenuRefactoring extends UsabilityRefactoring {

    transform() {
        const me = this;
        this.getItems().map(item => {
           item.appendChild(me.createActionLink(item));
        });

    }

    setBulkActionXpath(xpath) {
        this.bulkActionXpath = xpath;
    }

    getBulkAction() {
        return this.xpathInterpreter.getSingleElementByXpath(this.bulkActionXpath, this.getContext());
    }

    getItems() {
        const me = this;
        return this.getItemXpathList().map(itemXpath => {
            return me.xpathInterpreter.getSingleElementByXpath(itemXpath, this.getContext());
        });
    }

    setItemXpathList(aList) {
        this.itemXpathList = aList;
    }

    getItemXpathList() {
        if (!this.itemXpathList) {
            this.itemXpathList = [];
        }
        return this.itemXpathList;
    }

    createActionLink(item) {
        let linkElement = document.createElement("a");
        linkElement.textContent = "Action";
        const me = this;
        linkElement.addEventListener("click", function () {
            if (item.querySelector("input[type='checkbox']")) {
                item.querySelector("input[type='checkbox']").click();
            }
            else {
                item.click();
            }
            if (me.getBulkAction().getAttribute("type") == "submit") {
                me.getBulkAction().submit();
            }
            else {
                me.getBulkAction().click();
            }

        });
        return linkElement;
    }

    getSelectionView () {
        return DistributeMenuView;
    }

    clone(aContext) {
        let clonedRefactoring = super.clone(aContext);
        clonedRefactoring.setBulkActionXpath(this.xpathInterpreter.getPath(clonedRefactoring.getElementInContext(this.getBulkAction()), clonedRefactoring.getContext())[0]);
        const me = this;
        let newItemsXpath = this.getItems().map (item => {
            return me.xpathInterpreter.getPath(clonedRefactoring.getElementInContext(item), clonedRefactoring.getContext())[0];
        });
        clonedRefactoring.setItemXpathList(newItemsXpath);

        return clonedRefactoring;
    }

    static asString() {
        return "Distribute Menu";
    }

}

export default DistributeMenuRefactoring;