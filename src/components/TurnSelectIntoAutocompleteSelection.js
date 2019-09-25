import ElementSelectionView from "./ElementSelectionView";
import React from 'react';

class TurnSelectIntoAutocompleteSelection extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ElementSelectionView refactoring={this.props.refactoring} instruction={'Click on the select field the that will be turned into an autocomplete'}/>
        )
    }
}

export default TurnSelectIntoAutocompleteSelection;