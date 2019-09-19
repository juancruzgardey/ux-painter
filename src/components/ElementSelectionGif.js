/*global chrome*/

import React from "react";

class ElementSelectionGif extends React.Component {

    render() {
        return (
            <div className={"row col-12"}>
                <img style={{border: "none"}} className={"img-thumbnail"} src={chrome.runtime.getURL("selection.gif")}/>
            </div>
        )
    }
}

export default ElementSelectionGif;