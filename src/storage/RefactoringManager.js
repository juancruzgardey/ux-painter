import RefactoringStorage from './RefactoringStorage';

class RefactoringManager {

    constructor() {
        this.refactoringStorage = new RefactoringStorage();
    }

    getCurrentVersion() {
         return this.refactoringStorage.getCurrentVersion();
    }

    setCurrentVersion(aVersion) {
        this.refactoringStorage.setCurrentVersion(aVersion);
    }

    addVersion(aVersion) {
        this.refactoringStorage.addVersion(aVersion);
    }

    executeCurrentVersion() {
        this.getCurrentVersion().execute();
    }

    save() {
        this.refactoringStorage.save();
    }

}

export default RefactoringManager;