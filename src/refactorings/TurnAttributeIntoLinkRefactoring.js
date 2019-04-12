import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import TurnAttributeIntoLinkView from "../components/TurnAttributeIntoLinkView";

class TurnAttributeIntoLinkRefactoring extends UsabilityRefactoringOnElement {

    transform() {
        let newElement = document.createElement("a");
        newElement.href = this.getTargetURL();
        newElement.innerHTML = this.getElement().outerHTML;
        this.getElement().parentNode.replaceChild(newElement, this.getElement());
        this.styleElement = newElement;
    }

    getTargetURL() {
        return this.targetURL;
    }

    setTargetURL(aUrl) {
        this.targetURL = aUrl;
    }

    targetElements() {
        return "p, span, h1, h2, h3, h4, h5, h6, img";
    }

    getView() {
        return TurnAttributeIntoLinkView;
    }

    static asString() {
        return "Turn Attribute into Link";
    }

}

export default TurnAttributeIntoLinkRefactoring;