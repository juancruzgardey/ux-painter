/*global chrome*/
/* src/content.js */
import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";
import VersionListView from './components/VersionListView';
import Router from "route-lite";

class Main extends React.Component {

    render() {
        return (
            <div className={'uxpainter-frame'} style={{height: "100%"}}>
            <Frame head={[
                <link type="text/css" rel="stylesheet" href={'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'}></link>,
                <link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/0.chunk.css")} ></link>,
                <link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/1.chunk.css")} ></link>,
                <link type="text/css" rel="stylesheet" href={'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css'}></link>
            ]}>
                <FrameContextConsumer>
                    {
                        // Callback is invoked with iframe's window and document instances
                        ({document, window}) => {
                            // Render Children
                            return (
                                <div className={'ux-painter container'}>
                                    <Router>
                                        <VersionListView/>
                                    </Router>
                                </div>
                            )
                        }
                    }
                </FrameContextConsumer>
            </Frame>
            </div>
        )
    }
}

export default Main;