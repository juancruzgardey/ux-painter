
class RefactoringPreviewer {

    generatePreviews(aRefactoring) {
        let previewList = [];
        previewList.push(this.cloneRefactoring(aRefactoring));
        return previewList;
    }

    cloneRefactoring(aRefactoring) {
        let clonedRefactoring = aRefactoring.clone();
        clonedRefactoring.setPreviewElement(document.body.cloneNode(true));
        return clonedRefactoring;
    }

}

export default RefactoringPreviewer;