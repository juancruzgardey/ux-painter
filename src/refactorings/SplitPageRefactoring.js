import UsabilityRefactoring from "./UsabilityRefactoring";
import XPathInterpreter from "./XPathInterpreter";
import SplitPageSectionsView from "../components/SplitPageSectionsView";
import RefactoringPreviewer from "../previewers/RefactoringPreviewer";

class SplitPageRefactoring extends UsabilityRefactoring {

    constructor() {
        super();
        this.xpathInterpreter = new XPathInterpreter();
    }

    setSectionsXpath(sections) {
        this.sections = sections;
    }

    setSectionListContainerXpath(xpath) {
        this.sectionListContainerXpath = xpath;
    }

    transform() {
        this.activeSection = this.getSections()[0];
        this.createSectionsList();
        this.hideSections();
    }

    createSectionsList() {
        let sectionList = document.createElement("ul");
        const me = this;
        this.getSections().map(function (section) {
            let listElement = document.createElement("li");
            let elementLink = document.createElement("a");
            elementLink.textContent = section.name;
            elementLink.addEventListener("click", function () {
                me.getActiveSection().element.style.display = "none";
                section.element.style.display = section.element.getAttribute("uxpainter-display");
                me.setActiveSection(section);
            });
            listElement.appendChild(elementLink);
            sectionList.appendChild(listElement);
        });
        this.getSectionListContainer().appendChild(sectionList);
    }

    getSections() {
        const me = this;
        return this.sections.map(function (section) {
           let sectionElement =  me.xpathInterpreter.getSingleElementByXpath(section.xpath, me.getContext());
           return {name: section.name, element: sectionElement}
        });
    }

    hideSections() {
        const me = this;
        this.getSections().map(function (section) {
            section.element.setAttribute("uxpainter-display", section.element.style.display);
            section.element.style.display = "none";
        })
    }

    getActiveSection() {
        return this.activeSection;
    }

    setActiveSection(section) {
        this.activeSection = section;
    }

    getSectionListContainer() {
        let listContainer = this.xpathInterpreter.getSingleElementByXpath(this.sectionListContainerXpath, this.getContext());
        return listContainer;
    }

    getSelectionView() {
        return SplitPageSectionsView;
    }

    clone(aContext) {
       let clonedRefactoring = super.clone(aContext);
       const me = this;
       let sectionsXpath = this.getSections().map(section => {
          return {name: section.name, xpath: me.xpathInterpreter.getPath(clonedRefactoring.getElementInContext(section.element), clonedRefactoring.getContext())};
       });
       clonedRefactoring.setSectionsXpath(sectionsXpath);
       clonedRefactoring.setSectionListContainerXpath(me.xpathInterpreter.getPath(clonedRefactoring.getElementInContext(this.getSectionListContainer()),clonedRefactoring.getContext()));
       return clonedRefactoring;
    }

    static asString() {
        return "Split Page";
    }

    static getClassName() {
        return "SplitPageRefactoring";
    }

    static getPreviewer() {
        return new RefactoringPreviewer();
    }

}

export default SplitPageRefactoring;