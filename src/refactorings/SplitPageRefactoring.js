import UsabilityRefactoring from "./UsabilityRefactoring";
import SplitPageSectionsView from "../components/SplitPageSectionsView";
import SplitPagePreviewer from "../previewers/SplitPagePreviewer";

class SplitPageRefactoring extends UsabilityRefactoring {

    constructor() {
        super();
    }

    setSectionsXpath(sections) {
        this.sections = sections;
    }

    setSectionListContainerXpath(xpath) {
        this.sectionListContainerXpath = xpath;
    }

    transform() {
        this.activeSection = this.getSections()[0];
        this.createSectionsLinks();
        this.hideSections();
    }

    unDo() {
        this.sectionLinksList.parentNode.removeChild(this.sectionLinksList);
        this.getSections().map(section => {
           this.changeSectionDisplay(section, "");
        });
    }

    createSectionsLinks() {
        this.sectionLinks = [];
        const me = this;
        this.sectionLinksList = document.createElement("div");
        this.getSections().map(function (section) {
            let elementLink = document.createElement("a");
            elementLink.textContent = section.name;
            elementLink.addEventListener("click", function () {
                me.changeSectionDisplay(me.getActiveSection(), "none");
                me.changeSectionDisplay(section, "");
                me.setActiveSection(section);
            });
            me.sectionLinks.push(elementLink);
            me.sectionLinksList.appendChild(elementLink);
        });
        this.getSectionListContainer().parentNode.insertBefore(this.sectionLinksList,this.getSectionListContainer().nextSibling);
        this.applyStyles(this.getSectionLinks(), this.getStyle());
    }

    changeSectionDisplay(aSection, displayMode) {
        aSection.elements.map(element => {
           element.style.display = displayMode;
        });
    }

    getSections() {
        const me = this;
        return this.sections.map(function (section) {
           let sectionElements = section.xpaths.map(elementXpath => {
               return me.xpathInterpreter.getSingleElementByXpath(elementXpath, me.getContext());
           });
           return {name: section.name, elements: sectionElements}
        });
    }

    hideSections() {
        const me = this;
        this.getSections().map(function (section) {
            me.changeSectionDisplay(section, "none");
        });
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

    clone() {
       let clonedRefactoring = super.clone();
       clonedRefactoring.setSectionsXpath(this.sections);
       clonedRefactoring.setSectionListContainerXpath(this.sectionListContainerXpath);
        return clonedRefactoring;
    }

    getSectionLinks() {
        return this.sectionLinks;
    }

    serialize() {
        let json = super.serialize();
        json.sections = this.sections;
        json.sectionListContainerXpath = this.sectionListContainerXpath;
        return json;
    }


    static asString() {
        return "Split Page";
    }

    static getClassName() {
        return "SplitPageRefactoring";
    }

    static getPreviewer() {
        return new SplitPagePreviewer();
    }

    getDescription() {
        return "Divide the content on a cluttered page or form in different sections, so it is easier to read or interact with";
    }

    getDemoResources() {
        return ["SplitPageRefactoringBefore.gif", "SplitPageRefactoringAfter.gif"];
    }

    codeAvaiable() {
        return false
    }
}

export default SplitPageRefactoring;