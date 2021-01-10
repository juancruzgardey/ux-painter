import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement.js';
import RenameElementView from '../components/RenameElementView';

class RenameElementRefactoring extends UsabilityRefactoringOnElement {
    constructor () {
        super();
    }

    transform () {
        this.oldName = this.getElement().innerHTML;
        this.getElement().innerHTML = this.getNewName();
    }

    checkPreconditions() {
        return super.checkPreconditions() && this.getNewName();
    }

    unDo() {
        this.getElement().innerHTML = this.oldName;
    }

    setNewName (newName) {
        this.newName = newName;
    }

    getNewName() {
        return this.newName;
    }

    targetElements () {
        return "a, button, input[type='button'], input[type='submit'], span, p, h1, h2, h3, h4, h5, h6, label";
    }

    getView () {
        return RenameElementView;
    }

    clone(aContext) {
        let refactoring = super.clone();
        refactoring.setNewName(this.getNewName());
        return refactoring;
    }

    serialize() {
        let json = super.serialize();
        json.newName = this.getNewName();
        return json;
    }

    static asString () {
        return "Rename Element";
    }

    static getClassName() {
        return "RenameElementRefactoring";
    }

    getDescription() {
        return "Make more clear an interactive element's label (e.g. button or link)";
    }

    getDemoResources() {
        return ["RenameElementRefactoringBefore.png", "RenameElementRefactoringAfter.png"];
    }

    getCode() {
        let element = this.getElement();
        element.innerHTML = this.getNewName()
        return element.outerHTML
    }

}

export default RenameElementRefactoring;


