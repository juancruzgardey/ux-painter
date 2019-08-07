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
            sectionListContainerXpath: ''
        };
        this.addSection = this.addSection.bind(this);
        this.setSectionName = this.setSectionName.bind(this);
        this.saveSection = this.saveSection.bind(this);
        this.enableElementSelection = this.enableElementSelection.bind(this);

        this.refactor = this.refactor.bind(this);
        this.pageSelector = new PageSelector(this);
    }

    enableElementSelection() {
        this.pageSelector.enableElementSelection({
            "scrapperClass": "QuerySelectorScrapper",
            "targetElementSelector": "div,section,nav,footer,aside",
            "onElementSelection": "onElementSelection",
            "justFullPath": true
        });
        this.pageSelector.preventDomElementsBehaviour();
    }

    disableElementSelection() {
        this.pageSelector.restoreDomElementsBehaviour();
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

    onElementSelected(element) {
        const elementXpath = (new XPathInterpreter()).getPath(element, document.body)[0];
        const me = this;
        this.setState(state => {
            if (state.addSection) {
                state.newSectionXpath = elementXpath;
            }
            else {
                state.sectionListContainerXpath = elementXpath;
                me.disableElementSelection();
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
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <h2>Split Refactoring</h2>
                    </div>
                </div>
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
                                <p>Root Element: {this.state.newSectionXpath}</p>
                            </div>
                            <div className={'form-group'}>
                                <a className={'btn btn-light'} onClick={this.saveSection}>Confirm</a>
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
                        <p>Section List Container: {this.state.sectionListContainerXpath}</p>
                    </div>
                    <div className={'col-sm'}>
                        <a className={'btn btn-link'} onClick={this.enableElementSelection}>Change</a>
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-sm'}>
                        <a className={'btn btn-warning'} onClick={this.refactor}>Refactor</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default SplitPageSectionsView;