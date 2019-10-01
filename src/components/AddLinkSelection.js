import ElementSelectionView from "./ElementSelectionView";
import React from 'react';

class AddLinkSelection extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ElementSelectionView refactoring={this.props.refactoring} instruction={'Select the element in the page where the new link will be placed'}/>
        )
    }
}

export default AddLinkSelection;