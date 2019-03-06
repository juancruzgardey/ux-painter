
class UsabilityRefactoring {
    constructor () {}
    initialize () {}
    transform () {}
    applyStyle () {}
    static asString () {}

    execute () {
        this.initialize();
        this.transform();
        this.applyStyle();
    }

    isOnElement () {
        return false;
    }

    serialize () {
        return {"refactoring": this.constructor.name}
    }

    createRefactoring(json) {
        return new window[json.refactoring](json);
    }
}

export default UsabilityRefactoring;














    









