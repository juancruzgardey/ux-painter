import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import RefactoringView from "../components/RefactoringView";
import TurnInputIntoTextareaPreviewer from "../previewers/TurnInputIntoTextareaPreviewer";

class TurnInputIntoTextareaRefactoring extends UsabilityRefactoringOnElement {

    transform() {
        this.getElement().setAttribute("type", "hidden");

        let textArea = document.createElement("textarea");
        this.getElement().parentNode.insertBefore(textArea, this.getElement());
        const me = this;
        textArea.addEventListener("keyup", function () {
            me.getElement().value =  textArea.value;
        });
        console.log(this.getStyle());
        this.applyStyles([textArea], this.getStyle().targetElement);
    }

    targetElements() {
        return "input[type='text']";
    }

    getView() {
        return RefactoringView;
    }

    static asString() {
        return "Turn Input into Textarea";
    }

    static getPreviewer() {
        return new TurnInputIntoTextareaPreviewer();
    }
}

export default TurnInputIntoTextareaRefactoring;