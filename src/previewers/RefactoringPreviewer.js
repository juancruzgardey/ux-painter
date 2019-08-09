
class RefactoringPreviewer {

    generatePreviews(aRefactoring) {
        let previewList = [];
        previewList.push(this.cloneRefactoring(aRefactoring));
        return previewList;
    }

    cloneRefactoring(aRefactoring) {
        let clonedRefactoring = aRefactoring.clone(aRefactoring.getContext().cloneNode(true));
        return clonedRefactoring;
    }

}

export default RefactoringPreviewer;