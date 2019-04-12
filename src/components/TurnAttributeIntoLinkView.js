import React from 'react';
import RefactoringOnElementView from "./RefactoringOnElementView";

class TurnAttributeIntoLinkView extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.refactoring = this.props.refactoring;
        this.state = {targetURL: ''};
    }

    handleChange(event) {
        this.setState({targetURL: event.target.value});
        this.refactoring.setTargetURL(event.target.value);
    }

    render () {
        return (
            <RefactoringOnElementView refactoring={this.refactoring}>
                <div className={'form-group'}>
                    <label>Target URL</label>
                    <input type={'text'} className={'form-control'} onChange={this.handleChange}/>
                </div>
            </RefactoringOnElementView>
        )
    }
}

export default TurnAttributeIntoLinkView;