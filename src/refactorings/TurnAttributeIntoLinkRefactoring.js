import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import TurnAttributeIntoLinkView from "../components/TurnAttributeIntoLinkView";
import TurnAttributeIntoLinkPreviewer from "../previewers/TurnAttributeIntoLinkPreviewer";

class TurnAttributeIntoLinkRefactoring extends UsabilityRefactoringOnElement {

    transform() {
        this.linkElement = document.createElement("a");
        this.linkElement.href = this.getTargetURL();
        this.linkElement.innerHTML = this.getElement().innerHTML;
        this.getElement().innerHTML = "";
        this.getElement().appendChild(this.linkElement);
        this.styleElement = this.linkElement;
        this.applyStyle();
    }

    getTargetURL() {
        return this.targetURL;
    }

    setTargetURL(aUrl) {
        this.targetURL = aUrl;
    }

    targetElements() {
        return "p, span, h1, h2, h3, h4, h5, h6, img, div, li";
    }

    getView() {
        return TurnAttributeIntoLinkView;
    }

    clone() {
        let refactoring = super.clone();
        refactoring.setTargetURL(this.getTargetURL());
        return refactoring;
    }


    applyStyle() {
        const me = this;
        Object.keys(me.getStyle()).forEach(function (cssProperty) {
            me.linkElement.style[cssProperty] = me.getStyle()[cssProperty];
        });
    }

    static asString() {
        return "Turn Attribute into Link";
    }

    static getPreviewer() {
        return new TurnAttributeIntoLinkPreviewer();
    }

}

export default TurnAttributeIntoLinkRefactoring;