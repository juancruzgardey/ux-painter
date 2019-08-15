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

    createSectionsLinks() {
        this.sectionLinks = [];
        const me = this;
        let sectionLinksContainer = document.createElement("div");
        this.getSections().map(function (section) {
            let elementLink = document.createElement("a");
            elementLink.textContent = section.name;
            elementLink.addEventListener("click", function () {
                me.getActiveSection().element.style.display = "none";
                section.element.style.display = section.element.getAttribute("uxpainter-display");
                section.element.scrollIntoView();
                me.setActiveSection(section);
            });
            me.sectionLinks.push(elementLink);
            sectionLinksContainer.appendChild(elementLink);
        });
        this.getSectionListContainer().appendChild(sectionLinksContainer);
        this.applyStyles(this.getSectionLinks(), this.getStyle());
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

    isContainerAList() {
        return this.getSectionListContainer().tagName == "UL";
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

    getSectionLinks() {
        return this.sectionLinks;
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

}

export default SplitPageRefactoring;