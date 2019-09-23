import React from 'react';
import PageSelector from "../PageSelector";
import XPathInterpreter from "../refactorings/XPathInterpreter";
import RefactoringConfigurationView from "./RefactoringConfigurationView";
import SplitPageLinksView from "./SplitPageLinksView";
import ElementSelectionGif from "./ElementSelectionGif";

class SplitPageSectionsView extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
        this.state = {
            sections: [],
            addSection: false,
            newSectionName: '',
            newSectionXpaths: [],
            sectionError: false
        };
        this.addSection = this.addSection.bind(this);
        this.setSectionName = this.setSectionName.bind(this);
        this.saveSection = this.saveSection.bind(this);
        this.cancelSection = this.cancelSection.bind(this);
        this.enableElementSelection = this.enableElementSelection.bind(this);

        this.pageSelector = new PageSelector(this);

        this.props.refactoring.setSectionsXpath(this.state.sections);
        this.xpathInterpreter = new XPathInterpreter();
    }

    enableElementSelection() {
        this.pageSelector.enableElementSelection({
            "targetElementSelector": this.pageSelector.getAllVisibleDomElementsSelector()
        });
        this.pageSelector.preventDomElementsBehaviour();
    }

    disableElementSelection() {
        this.pageSelector.restoreDomElementsBehaviour();
    }

    addSection() {
        this.setState({addSection: true, newSectionName: '', newSectionXpaths: [], sectionError:false});
        this.enableElementSelection();
    }

    cancelSection() {
        if (this.state.newSectionXpaths.length > 0) {
            this.state.newSectionXpaths.map(elementXpath => {
                const sectionElement = this.xpathInterpreter.getSingleElementByXpath(elementXpath, this.refactoring.getContext());
                this.pageSelector.removeSelectionClass(sectionElement);
            });
        }
        this.setState({addSection: false, newSectionName: '', newSectionXpaths :[]});
        this.disableElementSelection();
    }

    onElementSelected(element) {
        const elementXpath = (this.xpathInterpreter.getPath(element, this.props.refactoring.getContext()))[0];
        this.state.newSectionXpaths.push(elementXpath);
        this.pageSelector.addSelectionClass(element);
    }

    setSectionName(event) {
        let inputValue = event.target.value;
        this.setState({newSectionName: inputValue});
    }

    saveSection() {
        if (!this.state.newSectionName || this.state.newSectionXpaths.length == 0) {
            return
        }
        this.setState(state => {
            state.sections.push({name: state.newSectionName, xpaths: state.newSectionXpaths});
            state.addSection = false;
            state.sectionError = false;
            return state;
        });
        this.disableElementSelection();
    }

    onNext() {
        if (this.state.sections.length == 0) {
            this.setState({sectionError: true});
            return false;
        }
        if (this.state.addSection) {
            this.disableElementSelection();
        }
        this.refactoring.setSectionsXpath(this.state.sections);
        return true;
    }

    onBack() {
        if (this.state.addSection) {
            this.disableElementSelection();
        }
        this.pageSelector.removeSelectedElementsHighlighting();
    }

    next() {
        return SplitPageLinksView;
    }

    render() {
        return (
            <RefactoringConfigurationView child={this} refactoring={this.props.refactoring} description={'Define the sections of the target page'}>
                {!this.state.addSection && ([
                    <div className={'row col-12'}>
                        <a className={'btn btn-secondary'} onClick={this.addSection}>Create Section</a>
                    </div>,
                    <div className={'row col-12'}>
                        <ul>
                            {this.state.sections.map(section => {
                                return <li>{section.name}</li>
                            })}
                            </ul>
                        </div>
                ])}
                {this.state.sectionError && (
                    <div className={'row col-12'}>
                        <p className={'text-danger'}>At least one section must be defined</p>
                    </div>
                )}
                {this.state.addSection && (
                    <div className={'row col-12'}>
                            <div className={'form-group'}>
                                <p className={'uxpainter-message'}>Complete the section name and select all the elements in the page that belongs to the new section</p>
                            </div>
                            <ElementSelectionGif/>
                            <div className={'form-group'}>
                                <label>Section Name</label>
                                <input type={'text'} className={'form-control'} onChange={this.setSectionName}/>
                            </div>
                            <div className={'form-group'}>
                                <a className={'btn btn-light inline-link'} onClick={this.saveSection}>Add Section</a>
                                <a className={'btn btn-danger inline-link'} onClick={this.cancelSection}>Cancel</a>
                            </div>
                    </div>
                )}
            </RefactoringConfigurationView>
        )
    }
}

export default SplitPageSectionsView;