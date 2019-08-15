import React from 'react';
import PageSelector from "../PageSelector";
import XPathInterpreter from "../refactorings/XPathInterpreter";
import RefactoringView from "./RefactoringView";

class SplitPageSectionsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            addSection: false,
            newSectionName: '',
            newSectionXpath: '',
            sectionListContainerXpath: '',
            selectingLinksContainer: false
        };
        this.addSection = this.addSection.bind(this);
        this.setSectionName = this.setSectionName.bind(this);
        this.saveSection = this.saveSection.bind(this);
        this.cancelSection = this.cancelSection.bind(this);
        this.enableElementSelection = this.enableElementSelection.bind(this);

        this.enableLinksContainerSelection = this.enableLinksContainerSelection.bind(this);
        this.disableLinksContainerSelection = this.disableLinksContainerSelection.bind(this);

        this.refactor = this.refactor.bind(this);
        this.pageSelector = new PageSelector(this);

        this.props.refactoring.setSectionsXpath(this.state.sections);
        this.xpathInterpreter = new XPathInterpreter();
    }

    enableElementSelection() {
        this.pageSelector.enableElementSelection({
            "scrapperClass": "QuerySelectorScrapper",
            "targetElementSelector": "div,section,nav,footer,aside, header, ul",
            "onElementSelection": "onElementSelection",
            "justFullPath": true
        });
        this.pageSelector.preventDomElementsBehaviour();
    }

    disableElementSelection() {
        this.pageSelector.restoreDomElementsBehaviour();
    }

    enableLinksContainerSelection () {
        this.setState(state => {
           state.selectingLinksContainer = true;
           return state;
        });
        this.enableElementSelection();
    }

    disableLinksContainerSelection () {
        this.setState(state => {
            state.selectingLinksContainer = false;
            return state;
        });
        this.disableElementSelection();
    }


    addSection() {
        this.setState(state => {
            state.addSection = true;
            state.newSectionName = '';
            state.newSectionXpath = '';
            return state
        });
        this.enableElementSelection();
    }

    cancelSection() {
        if (this.state.newSectionXpath) {
            const section = this.xpathInterpreter.getSingleElementByXpath(this.state.newSectionXpath, this.props.refactoring.getContext());
            this.pageSelector.removeSelectionClass(section);
        }
        this.setState(state => {
            state.addSection = false;
            state.newSectionName = '';
            state.newSectionXpath = '';
            return state
        });
        this.disableElementSelection();
    }

    onElementSelected(element) {
        const elementXpath = (this.xpathInterpreter.getPath(element, this.props.refactoring.getContext()))[0];
        const me = this;
        this.setState(state => {
            if (state.addSection) {
                state.newSectionXpath = elementXpath;
                me.pageSelector.addSelectionClass(element);
            }
            else {
                state.sectionListContainerXpath = elementXpath;
                this.props.refactoring.setSectionListContainerXpath(elementXpath);
                me.disableElementSelection();
                state.selectingLinksContainer = false;
            }
            return state;
        });
    }

    setSectionName(event) {
        let inputValue = event.target.value;
        this.setState(state => {
            state.newSectionName = inputValue;
            return state;
        });
    }

    saveSection() {
        if (!this.state.newSectionName || !this.state.newSectionXpath) {
            return
        }
        this.setState(state => {
            state.sections.push({name: state.newSectionName, xpath: state.newSectionXpath});
            state.addSection = false;
            return state;
        });
        this.disableElementSelection();
    }

    refactor() {
        this.props.refactoring.setSectionListContainerXpath(this.state.sectionListContainerXpath);
        this.props.refactoring.setSectionsXpath(this.state.sections);
        this.props.refactoring.execute();
    }

    render() {
        return (
            <RefactoringView refactoring={this.props.refactoring}>
                {!this.state.addSection && (<div className={'row'}>
                    <div className={'col-md-12'}>
                        <a className={'btn btn-secondary'} onClick={this.addSection}>Add Section</a>
                    </div>
                </div>)}
                {this.state.addSection && (
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <div className={'form-group'}>
                                <label>Section Name</label>
                                <input type={'text'} className={'form-control'} onChange={this.setSectionName}/>
                            </div>
                            <div className={'form-group'}>
                                <p>Root Element: {this.state.newSectionXpath?this.state.newSectionXpath:
                                    <span className={'uxpainter-message'}>Select an Element</span>}</p>
                            </div>
                            <div className={'form-group'}>
                                <a className={'btn btn-light inline-link'} onClick={this.saveSection}>Add</a>
                                <a className={'btn btn-danger inline-link'} onClick={this.cancelSection}>Cancel</a>
                            </div>
                        </div>
                    </div>
                )}
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <ul>
                            {this.state.sections.map(section => {
                                return <li>{section.name}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-sm'}>
                        <p>Section Links Container:
                            {this.state.selectingLinksContainer?
                                <a className={'btn btn-link'} style={{color: '#007bff', padding: 0}} onClick={this.disableLinksContainerSelection}>Cancel</a>:
                                <a className={'btn btn-link'} style={{color: '#007bff', padding: 0}} onClick={this.enableLinksContainerSelection}>Change</a>}</p>
                    </div>
                    {this.state.selectingLinksContainer?
                        <div className={'col-sm'}>
                            <span className={'uxpainter-message'}>Select an Element</span>
                        </div>:null}
                    <div className={'col-sm'}>
                        <p>Current element: {this.state.sectionListContainerXpath}</p>
                    </div>
                </div>
            </RefactoringView>
        )
    }
}

export default SplitPageSectionsView;