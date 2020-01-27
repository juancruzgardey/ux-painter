/*global chrome*/
/* src/content.js */
import React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";
import VersionListView from './components/VersionListView';
import Router from "route-lite";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hidden: false};
    }

    toggleView(iframe) {
        this.setState({hidden: !this.state.hidden}, () => {
            if (this.state.hidden) {
                document.querySelector("#refactoring-extension-root").className = "closed";
                iframe.querySelector(".ux-painter.container").style.display = "none";
            }
            else {
                document.querySelector("#refactoring-extension-root").className = "opened";
                iframe.querySelector(".ux-painter.container").style.display = "";
            }
        });
    }

    render() {
        const me = this;
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
                            let iconClassName = me.state.hidden?"far fa-caret-square-down fa-lg":"far fa-caret-square-up fa-lg";
                            let control = <a className={'uxpainter-control'} onClick={() => {this.toggleView(document)}}><i className={iconClassName}></i></a>;
                            const mainContent = <div className={'ux-painter container'}>
                                <Router>
                                    <VersionListView/>
                                </Router>
                            </div>
                            return [control, mainContent];
                        }
                    }
                </FrameContextConsumer>
            </Frame>
            </div>
        )
    }
}

export default Main;