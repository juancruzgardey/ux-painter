import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import TurnAttributeIntoLinkView from "../components/TurnAttributeIntoLinkView";

class AddLinkRefactoring extends UsabilityRefactoringOnElement {

    constructor() {
        super();
    }

    transform() {
        this.linkElement = document.createElement("a");
        this.linkElement.textContent = this.getLinkName();
        this.linkElement.href = this.getTargetURL();
        this.getElement().appendChild(this.linkElement);
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
        return "div, ul";
    }

    getView() {
        return TurnAttributeIntoLinkView;
    }

    clone() {
        let refactoring = super.clone();
        refactoring.setTargetURL(this.getTargetURL());
        return refactoring;
    }

    static asString() {
        return "Add Link";
    }

}

export default AddLinkRefactoring;