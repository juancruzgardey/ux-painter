import React from 'react';
import { Link, goBack } from 'route-lite';
import RefactoringListView from "./RefactoringListView";

class RefactoringView extends React.Component {

    constructor(props) {
        super(props);
        this.refactoring = this.props.refactoring;
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit() {
        this.refactoring.execute();
    }


    render () {
        const refactoringUrl = document.location.href.replace(document.location.search, "");
        return (
            <div className={"row"}>
                <div className={'col-md-12'}>
                    <h2>{this.refactoring.constructor.asString()}</h2>
                    <input type={'hidden'} id={'url_for_instance'} value={refactoringUrl}/>
                    {this.props.children}
                    <div className={'form-group'}>
                        <Link className={'btn btn-warning'} onClick={this.handleSubmit} component={RefactoringListView}>Refactor</Link>
                    </div>
                    <div className={'form-group'}>
                        <Link className={'btn btn-secondary'} onClick={() => goBack()}>Back</Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default RefactoringView;