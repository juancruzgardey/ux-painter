import UsabilityRefactoringOnElement from './UsabilityRefactoringOnElement.js';
import RenameElementView from '../components/RenameElementView';

class RenameElementRefactoring extends UsabilityRefactoringOnElement {
    constructor () {
        super();
    }

    transform () {
        const anElement = this.getElement();
        if (anElement !== "undefined") {
            anElement.innerHTML = this.newName;
        }
    }

    setNewName (newName) {
        this.newName = newName;
    }

    serialize () {
        let json = super.serialize();
        json.newName = this.newName;
        return json;
    }

    targetElements () {
        return "a, button, input[type='button'], input[type='submit'], span, p, h1, h2, h3, h4, h5, h6";
    }

    getView () {
        return RenameElementView;
    }

    static asString () {
        return "Rename Element";
    }

}

export default RenameElementRefactoring;


