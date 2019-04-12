import React from 'react';
import PageSelector from '../PageSelector';
import XPathInterpreter from '../refactorings/XPathInterpreter';
import {goBack, Link} from 'route-lite';
import domtoimage from 'dom-to-image';

class ElementSelectionView extends React.Component {

    constructor (props) {
        super(props);
        this.state = {elementXpath: ""};
        this.refactoring = this.props.refactoring;
        this.pageSelector = new PageSelector (this);
        this.pageSelector.enableElementSelection({
            "scrapperClass": "QuerySelectorScrapper",
            "targetElementSelector": this.refactoring.targetElements(),
            "onElementSelection": "onElementSelection",
            "justFullPath": true
        });
        this.pageSelector.preventDomElementsBehaviour();

        this.disableElementSelection = this.disableElementSelection.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.targetElementImage = React.createRef();
    }


    onElementSelected(anElement) {
        const elementXpath = (new XPathInterpreter()).getPath(anElement, document.body)[0];
        this.setState({elementXpath: elementXpath});
        this.refactoring.setElementXpath(elementXpath);
        const me = this;
        domtoimage.toPng(anElement, {width: 300, height: 200}).then(function (dataUrl) {
            me.targetElementImage.current.src = dataUrl;
        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }

    disableElementSelection() {
        this.pageSelector.restoreDomElementsBehaviour();
    }

    handleBack() {
        this.disableElementSelection();
        goBack();
    }

    render () {
        return (
        <div className={"row"}>
            <div className={"col-md-12"}>
                <h2>Select an Element</h2>
                <div className={'form-group'}>
                    <p>Target Element</p>
                    <img className={'target_element_image'} ref={this.targetElementImage}/>
                </div>
                <div className={'form-group'}>
                    <Link onClick={this.disableElementSelection} className={'btn btn-warning'} component={this.refactoring.getView()} componentProps={{"refactoring": this.refactoring}}>Continue</Link>
                </div>
                <div className={'form-group'}>
                    <Link className={'btn btn-secondary'} onClick={() => this.handleBack()}>Back</Link>
                </div>
            </div>
        </div>

        );
    }


}

export default ElementSelectionView;