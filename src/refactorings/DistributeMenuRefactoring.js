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
        //let linkElement = document.createElement("a");
        //linkElement.textContent = "Action";
        let linkElement = this.getBulkAction().cloneNode(true);
        if (linkElement.type == "submit") {
            linkElement.addEventListener("submit", function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
            });
        }
        const me = this;
        linkElement.addEventListener("click", function (e) {
            if (item.querySelector("input[type='checkbox']")) {
                item.querySelector("input[type='checkbox']").click();
            }
            else {
                item.click();
            }
            me.getBulkAction().click();
            e.stopImmediatePropagation();
        });
        return linkElement;
    }

    findSimilarItems(item) {
        let similarItems = [];
        let candidateElements = document.querySelectorAll(item.tagName.toLowerCase());
        for (let i = 0; i < candidateElements.length; i++) {
            if (this.areSimilarItems(item, candidateElements[i])) {
                similarItems.push(candidateElements[i]);
            }
        }
        return similarItems;
    }

    areSimilarItems(item, otherItem) {
        if (item.children.length != otherItem.children.length) {
            return false;
        }
        if (item.children.length == 0 && otherItem.children.length == 0) {
            return item.tagName == otherItem.tagName;
        }
        let equals = true;
        for (let i = 0; i < item.children.length && equals; i++) {
            equals = this.areSimilarItems(item.children[i], otherItem.children[i]);
        }
        return equals;

    }

    getSelectionView () {
        return DistributeMenuView;
    }

    clone(aContext) {
        let clonedRefactoring = super.clone(aContext);
        clonedRefactoring.setBulkActionXpath(this.xpathInterpreter.getPath(clonedRefactoring.getElementInContext(this.getBulkAction()), clonedRefactoring.getContext())[0]);
        const me = this;
        let newItemsXpath = this.getItems().map (item => {
            console.log(clonedRefactoring.getElementInContext(item));
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