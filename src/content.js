/*global chrome*/
/* src/content.js */
import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";
import RefactoringListView from './components/RefactoringListView';
import Router from "route-lite";

class Main extends React.Component {

    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/1.chunk.css")} ></link>]}>
                <FrameContextConsumer>
                    {
                        // Callback is invoked with iframe's window and document instances
                        ({document, window}) => {
                            // Render Children
                            return (
                                <div className={'my-extension'}>
                                    <Router>
                                        <RefactoringListView/>
                                    </Router>
                                </div>
                            )
                        }
                    }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

export default Main;