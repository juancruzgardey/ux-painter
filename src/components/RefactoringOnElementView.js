import React from 'react';
import RefactoringView from './RefactoringView';

class RefactoringOnElementView extends React.Component {

    constructor (props) {
        super(props);
        this.targetElementImage = React.createRef();
        const me = this;
    }


    render () {
        return (
            <RefactoringView refactoring={this.props.refactoring}>
                <div className={'form-group'}>
                    <p style={{color: "#dbbf70", fontWeight:"bold"}}>Target Element</p>
                </div>
                {this.props.children}
            </RefactoringView>
        )
    }
}

export default RefactoringOnElementView