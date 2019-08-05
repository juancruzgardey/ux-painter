import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement.js';
import RenameElementView from '../components/RenameElementView';

class RenameElementRefactoring extends UsabilityRefactoringOnElement {
    constructor () {
        super();
    }

    transform () {
        const anElement = this.getElement();
        if (anElement !== "undefined") {
            anElement.innerHTML = this.getNewName();
        }
    }

    setNewName (newName) {
        this.newName = newName;
    }

    getNewName() {
        return this.newName;
    }

    targetElements () {
        return "a, button, input[type='button'], input[type='submit'], span, p, h1, h2, h3, h4, h5, h6";
    }

    getView () {
        return RenameElementView;
    }

    clone() {
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

}

export default RenameElementRefactoring;


