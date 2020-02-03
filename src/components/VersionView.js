import React from "react";
import {Link, goTo} from "route-lite";
import VersionListView from "./VersionListView";

class VersionView extends React.Component {

    constructor(props) {
        super(props);
        this.props.version = this.props.version.clone();
        this.state = {versionName: this.props.version.getName()
            && this.props.version.getName() != window.refactoringManager.getOriginalVersion().getName() ?this.props.version.getName(): ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({versionName: event.target.value});
        this.props.version.setName(event.target.value);
    }

    handleSubmit() {
        if (this.props.version.getName() &&
            window.refactoringManager.getOriginalVersion().getName() != this.props.version.getName()) {
            window.refactoringManager.addVersion(this.props.version);
            window.refactoringManager.setCurrentVersion(this.props.version);
            window.refactoringManager.save();
            goTo(VersionListView);
        }
    }

    render() {
        return (
            <div className={'container'}>
                <h3 className={"text-center"}>New Version</h3>
                <div className={'row col-12 uxpainter-long-row'}>
                    <p className={'uxpainter-message'}>The version cannot be save as <strong>{window.refactoringManager.getOriginalVersion().getName()}</strong> because that is immutable</p>
                </div>
                <div className={'row col-12 uxpainter-long-row'}>
                    <label>Name</label>
                    <input type={'text'} className={'form-control'} value={this.state.versionName} onChange={this.handleChange}/>
                </div>
                <div className={'row uxpainter-long-row'}>
                    <div className={'col-5'}>
                        <Link className={'btn btn-secondary'} component={VersionListView}><i className="fas fa-arrow-circle-left"></i> Back</Link>
                    </div>
                    <div className={'col-5'}>
                        <Link className={'btn btn-dark'} onClick={this.handleSubmit}>Create</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default VersionView;