import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import AddLinkView from "../components/AddLinkView";
import TurnAttributeIntoLinkPreviewer from "../previewers/TurnAttributeIntoLinkPreviewer";

class AddLinkRefactoring extends UsabilityRefactoringOnElement {

    constructor() {
        super();
    }

    transform() {
        this.linkElement = document.createElement("a");
        this.linkElement.textContent = this.getLinkName();
        this.linkElement.href = this.getTargetURL();
        this.getElement().appendChild(this.linkElement);
        this.applyStyles([this.linkElement], this.getStyle().targetElement);
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

    static asString() {
        return "Add Link";
    }

    static getPreviewer() {
        return new TurnAttributeIntoLinkPreviewer();
    }

    static getClassName() {
        return "AddLinkRefactoring";
    }

}

export default AddLinkRefactoring;