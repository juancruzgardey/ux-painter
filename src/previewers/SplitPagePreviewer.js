import RefactoringPreviewer from "./RefactoringPreviewer";

class SplitPagePreviewer extends RefactoringPreviewer {

    generatePreviews(aSplitPage) {
        const sectionLinksSegment = this.pageSegmentator.findPageSegmentOfElement(aSplitPage.getSectionListContainer());
        let existingStyles = this.styleScrapper.getStyles("a", sectionLinksSegment, ["background", "color", "font-family","font-size","margin","padding", "display"]);

        return existingStyles.map(style => {
            let previewRefactoring = aSplitPage.clone();
            previewRefactoring.setStyle(style);
            return previewRefactoring;
        });

    }

}

export default SplitPagePreviewer;