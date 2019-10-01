import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import AddLinkView from "../components/AddLinkView";
import TurnAttributeIntoLinkPreviewer from "../previewers/TurnAttributeIntoLinkPreviewer";
import AddLinkSelection from "../components/AddLinkSelection";

class AddLinkRefactoring extends UsabilityRefactoringOnElement {

    constructor() {
        super();
    }

    checkPreconditions () {
        return super.checkPreconditions() && this.getLinkName() && this.getTargetURL();
    }

    transform() {
        this.linkElement = document.createElement("a");
        this.linkElement.textContent = this.getLinkName();
        this.linkElement.href = this.getTargetURL();
        this.getElement().appendChild(this.linkElement);
        this.applyStyles([this.linkElement], this.getStyle().targetElement);
    }

    unDo() {
        this.linkElement.parentNode.removeChild(this.linkElement);
    }

    getTargetURL() {
        return this.targetURL;
    }

    setTargetURL(aUrl) {
        this.targetURL = aUrl;
    }

    getLinkName() {
        return this.linkName;
    }

    setLinkName(aName) {
        this.linkName = aName;
    }

    targetElements() {
        return "div, ul, nav, section, header";
    }

    getView() {
        return AddLinkView;
    }

    clone() {
        let refactoring = super.clone();
        refactoring.setTargetURL(this.getTargetURL());
        refactoring.setLinkName(this.getLinkName());
        return refactoring;
    }

    serialize() {
        let json = super.serialize();
        json.linkName = this.getLinkName();
        json.targetURL = this.getTargetURL();
        return json;
    }

    getSelectionView() {
        return AddLinkSelection;
    }

    static asString() {
        return "Add Link";
    }

    static getPreviewer() {
        return new TurnAttributeIntoLinkPreviewer();
    }

    static getClassName() {
        return "AddLinkRefactoring";
    }

    getDescription() {
        return "Add a new link in a specific element of the target page. Link's name and destination URL must be provided";
    }

}

export default AddLinkRefactoring;