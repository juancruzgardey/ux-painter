import UsabilityRefactoring from "./UsabilityRefactoring";
import DistributeMenuView from "../components/DistributeMenuView";

class DistributeMenuRefactoring extends UsabilityRefactoring {

    transform() {
        const me = this;
        this.getItems().map((item, index) => {
           item.appendChild(me.createActionLink(me.getItemLinks()[index]));
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

    createActionLink(itemActivationElement) {
        let linkElement = this.getBulkAction().cloneNode(true);
        if (linkElement.type == "submit") {
            linkElement.addEventListener("submit", function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
            });
        }
        const me = this;
        linkElement.addEventListener("click", function (e) {
            itemActivationElement.click();
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
                this.itemXpathList.push(this.xpathInterpreter.getPath(candidateElements[i], this.getContext())[0]);
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

    findItemsActivationLink(anElement) {
        const me = this;
        this.itemLinkXpaths = this.getItems().map((item, index) => {
            let itemLink = me.pageSelector.findSimilarElements(item, anElement)[0];
            if (itemLink) {
                return me.xpathInterpreter.getPath(itemLink, me.getContext())[0];
            }
            else {
                return me.itemXpathList[index];
            }
        });
        return this.itemLinkXpaths;
    }

    getItemLinks() {
        const me = this;
        return this.itemLinkXpaths.map(xpath => {
           return me.xpathInterpreter.getSingleElementByXpath(xpath, me.getContext());
        });
    }

    setItemLinkXpathList(xpathList) {
        this.itemLinkXpaths = xpathList;
    }

    getSelectionView () {
        return DistributeMenuView;
    }

    clone(aContext) {
        let clonedRefactoring = super.clone(aContext);
        clonedRefactoring.setBulkActionXpath(this.xpathInterpreter.getPath(clonedRefactoring.getElementInContext(this.getBulkAction()), clonedRefactoring.getContext())[0]);
        clonedRefactoring.setItemXpathList(clonedRefactoring.getElementsXpath(this.getItems()));
        clonedRefactoring.setItemLinkXpathList(clonedRefactoring.getElementsXpath(this.getItemLinks()));
        return clonedRefactoring;
    }

    serialize() {
        let json = super.serialize();
        json.itemXpathList = this.itemXpathList;
        json.itemLinkXpaths = this.itemLinkXpaths;
        json.bulkActionXpath = this.bulkActionXpath;
        return json;
    }

    static getClassName() {
        return "DistributeMenuRefactoring";
    }

    static asString() {
        return "Distribute Menu";
    }

    getDescription() {
        return "Add a link or button for an action to every item, so applying the action on a single element is simpler";
    }

}

export default DistributeMenuRefactoring;