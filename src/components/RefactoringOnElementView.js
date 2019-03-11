import React from 'react';
import RefactoringView from './RefactoringView';
import domtoimage from "dom-to-image";

class RefactoringOnElementView extends React.Component {

    constructor (props) {
        super(props);
        this.targetElementImage = React.createRef();
        const me = this;
        domtoimage.toPng(this.props.refactoring.getElement(), {width: 300, height: 200}).then(function (dataUrl) {
            me.targetElementImage.current.src = dataUrl;
        }).catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    }


    render () {
        return (
            <RefactoringView refactoring={this.props.refactoring}>
                <div className={'form-group'}>
                    <p>Target Element</p>
                    <img className={'target_element_image'} ref={this.targetElementImage}/>
                </div>
                {this.props.children}
            </RefactoringView>
        )
    }
}

export default RefactoringOnElementView