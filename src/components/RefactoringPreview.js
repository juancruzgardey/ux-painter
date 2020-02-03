import React from "react";
import {goBack, goTo} from "route-lite";
import RefactoringListView from "./RefactoringListView";
import PageSelector from "../PageSelector";
import ExtendVersionView from "./ExtendVersionView";
import RefactoringPreviewHeader from "./RefactoringPreviewHeader";
import RefactoringPreviewBody from "./RefactoringPreviewBody";
import {Link} from "route-lite";

class RefactoringPreview extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
        this.pageSelector = new PageSelector(this);
        this.pageSelector.removeSelectedElementsHighlighting();
        this.state = {loading:true};

        this.handleBack = this.handleBack.bind(this);
        this.setCurrentPreview = this.setCurrentPreview.bind(this);
    }

    componentDidMount() {
        const me = this;
        setTimeout(() => {
            me.previews = me.refactoring.constructor.getPreviewer().getPreviews(me.refactoring);
            me.setState({loading:false});
            },500);
    }

    setCurrentPreview(aRefactoring) {
        this.currentPreview = aRefactoring;
    }

    handleBack() {
        this.currentPreview.unDo();
        goBack();
    }

    render() {
        return (
            <div className={"container"}>
                <RefactoringPreviewHeader refactoring={this.refactoring}/>
                {this.state.loading && (
                    <div style={{"text-align": "center", "margin": "10px auto"}}>
                        <div className="spinner-border row" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className={"uxpainter-message"}>Loading previews</p>
                    </div>
                )}
                {!this.state.loading && <RefactoringPreviewBody previews={this.previews} setCurrentPreview={this.setCurrentPreview}/>}
                <div className={'row uxpainter-long-row'}>
                    <Link className={'btn btn-secondary'} onClick={this.handleBack}><i className="fas fa-arrow-circle-left"></i> Back</Link>
                </div>
            </div>
        )
    }
}

export default RefactoringPreview;