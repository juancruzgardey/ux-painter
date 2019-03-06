import React from 'react';
import RefactoringView from './RefactoringView';

class RefactoringOnElementView extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <RefactoringView refactoring={this.props.refactoring}>
                <div className={'uxpainter-form-group'}>
                    <label>Target Element</label>
                    <p>{this.props.refactoring.getElementXpath()}</p>
                </div>
                {this.props.children}
            </RefactoringView>
        )
    }
}

export default RefactoringOnElementView