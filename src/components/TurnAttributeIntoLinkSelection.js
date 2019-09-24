import ElementSelectionView from "./ElementSelectionView";
import React from 'react';

class TurnAttributeIntoLinkSelection extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ElementSelectionView refactoring={this.props.refactoring} instruction={'Select the text or the image that will be converted into a link'}/>
        )
    }
}

export default TurnAttributeIntoLinkSelection;