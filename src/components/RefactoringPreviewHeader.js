import React from "react";

class RefactoringPreviewHeader extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
    }

    render() {
        return ([
            <div className={"row"}>
                <div className={'col-12'}>
                    <h5 className={'text-center'}>Refactoring Preview</h5>
                </div>
            </div>,
            <div className={"row uxpainter-long-row col-12"}>
                <h6>{this.refactoring.constructor.asString()}</h6>
            </div>
        ]);
    }
}

export default RefactoringPreviewHeader;