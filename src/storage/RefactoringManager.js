import RefactoringStorage from './RefactoringStorage';
import AddAutocompleteRefactoring from "../refactorings/AddAutocompleteRefactoring";
import AddDatePickerRefactoring from "../refactorings/AddDatePickerRefactoring";
import AddFormValidationRefactoring from "../refactorings/AddFormValidationRefactoring";
import AddLinkRefactoring from "../refactorings/AddLinkRefactoring";
import AddTooltipRefactoring from "../refactorings/AddTooltipRefactoring";
import DateInputIntoSelectsRefactoring from "../refactorings/DateInputIntoSelectsRefactoring";
import FormatInputRefactoring from "../refactorings/FormatInputRefactoring";
import LinkToTopRefactoring from "../refactorings/LinkToTopRefactoring";
import RenameElementRefactoring from "../refactorings/RenameElementRefactoring";
import ResizeInputRefactoring from "../refactorings/ResizeInputRefactoring";
import TurnAttributeIntoLinkRefactoring from "../refactorings/TurnAttributeIntoLinkRefactoring";
import TurnInputIntoRadiosRefactoring from "../refactorings/TurnInputIntoRadiosRefactoring";
import TurnInputIntoSelectRefactoring from "../refactorings/TurnInputIntoSelectRefactoring";
import TurnInputIntoTextareaRefactoring from "../refactorings/TurnInputIntoTextareaRefactoring";
import SplitPageRefactoring from "../refactorings/SplitPageRefactoring";
import DistributeMenuRefactoring from "../refactorings/DistributeMenuRefactoring";
import DateSelectsIntoDatepickerRefactoring from "../refactorings/DateSelectsIntoDatepickerRefactoring";
import TurnSelectIntoAutocompleteRefactoring from "../refactorings/TurnSelectIntoAutocompleteRefactoring";
import AddInlineFormValidationRefactoring from "../refactorings/AddInlineFormValidationRefactoring";
import AddProcessingPageRefactoring from "../refactorings/AddProcessingPageRefactoring";

class RefactoringManager {

    constructor() {
        this.refactoringStorage = new RefactoringStorage();
        this.dirtyRefactorings = [];
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

    getOriginalVersion () {
        return this.refactoringStorage.getOriginalVersion();
    }

    getOriginalVersionName() {
        return this.refactoringStorage.getOriginalVersionName();
    }

    save() {
        this.refactoringStorage.save();
    }

    getVersions() {
        return this.refactoringStorage.getVersions();
    }

    getAllVersions() {
        return this.refactoringStorage.getAllVersions();
    }

    addDirtyRefactoring(aRefactoring) {
        this.dirtyRefactorings.push(aRefactoring);
    }

    getDirtyRefactorings() {
        return this.dirtyRefactorings;
    }

    clearDirtyRefactorings() {
        this.dirtyRefactorings = [];
    }

    saveDirtyRefactorings() {
        const me = this;
        this.getDirtyRefactorings().map(dirtyRefactoring => {
            me.getCurrentVersion().addRefactoring(dirtyRefactoring);
        });
        this.clearDirtyRefactorings();
    }

    getRefactoringCatalogue() {
        return [AddAutocompleteRefactoring, AddDatePickerRefactoring, AddFormValidationRefactoring, AddInlineFormValidationRefactoring,
            AddLinkRefactoring,AddProcessingPageRefactoring, AddTooltipRefactoring, DateInputIntoSelectsRefactoring, DateSelectsIntoDatepickerRefactoring, DistributeMenuRefactoring, FormatInputRefactoring, LinkToTopRefactoring, RenameElementRefactoring,
            ResizeInputRefactoring, SplitPageRefactoring, TurnAttributeIntoLinkRefactoring,
            TurnInputIntoRadiosRefactoring, TurnInputIntoSelectRefactoring, TurnInputIntoTextareaRefactoring, TurnSelectIntoAutocompleteRefactoring];
    }

    getRefactoringClass(aString) {
        let classes = this.getRefactoringCatalogue().filter(function (classObject) {
            return classObject.getClassName() == aString;
        });
        return classes?classes[0]:null;
    }

}

export default RefactoringManager;