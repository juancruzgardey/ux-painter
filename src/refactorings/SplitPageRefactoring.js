import UsabilityRefactoring from "./UsabilityRefactoring";
import XPathInterpreter from "./XPathInterpreter";
import SplitPageSectionsView from "../components/SplitPageSectionsView";

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
           return {name: section.name, element: me.xpathInterpreter.getElementByXPath(section.xpath, document.body)}
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
        return this.xpathInterpreter.getElementByXPath(this.sectionListContainerXpath, document.body);
    }

    getSelectionView() {
        return SplitPageSectionsView;
    }

    static asString() {
        return "Split Page";
    }

    static getClassName() {
        return "SplitPageRefactoring";
    }

}

export default SplitPageRefactoring;