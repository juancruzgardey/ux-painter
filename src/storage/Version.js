import UsabilityRefactoring from "../refactorings/UsabilityRefactoring";

class Version {

    constructor() {
        this.refactorings = [];
    }

    setName(aString) {
        this.name = aString;
    }

    getName() {
        return this.name;
    }

    addRefactoring(aRefactoring) {
        this.refactorings.push(aRefactoring);
    }

    serialize() {
        let json = {};
        json.name = this.name;
        json.refactorings = [];
        for (let i = 0; i < this.refactorings.length; i++) {
            json.refactorings.push(this.refactorings[i].serialize());
        }
        return json;
    }

    execute() {
        this.refactorings.map(function (refactoring) {
           if (refactoring.getURL() == document.location.href) {
               refactoring.execute();
           }
        });
    }

    static fromJSON(json) {
        let version = new Version();
        version.setName(json.name);
        for (let i = 0; i < json.refactorings; i++) {
            version.addRefactoring(UsabilityRefactoring.fromJSON(json.refactorings[i]));
        }
        return version;
    }
}

export default Version;