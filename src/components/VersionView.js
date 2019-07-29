import React from "react";
import {Link} from "route-lite";
import RefactoringListView from "./RefactoringListView";

class VersionView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {versionName: this.props.version.getName()?this.props.version.getName(): ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({versionName: event.target.value});
        this.props.version.setName(event.target.value);
    }

    handleSubmit() {
        if (this.props.version.getName()) {
            window.refactoringManager.addVersion(this.props.version);
            window.refactoringManager.setCurrentVersion(this.props.version.clone());
            window.refactoringManager.save();
        }
    }

    render() {
        return (
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <h2>Save Version</h2>
                    <div className={'form-group'}>
                        <label>Version Name</label>
                        <input type={'text'} className={'form-control'} value={this.state.versionName} onChange={this.handleChange}/>
                    </div>
                    <div className={'form-group'}>
                        <Link className={'btn btn-dark'} onClick={this.handleSubmit} component={RefactoringListView}>Save</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default VersionView;