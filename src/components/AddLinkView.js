import React from 'react';
import RefactoringOnElementView from "./RefactoringOnElementView";

class AddLinkView extends React.Component {

    constructor(props) {
        super(props);
        this.handleName = this.handleName.bind(this);
        this.handleURL = this.handleURL.bind(this);
    }

    handleName(event) {

    }

    handleURL(event) {

    }


    render () {
        return (
            <RefactoringOnElementView refactoring={this.refactoring}>
                <div className={'form-group'}>
                    <label>Link Name</label>
                    <input type={'text'} className={'form-control'} onChange={this.handleName}/>
                </div>
                <div className={'form-group'}>
                    <label>Target URL</label>
                    <input type={'text'} className={'form-control'} onChange={this.handleURL}/>
                </div>
            </RefactoringOnElementView>
        )
    }
}