import React, { Component } from 'react'

class Element extends Component {

    componentDidMount() {
        $('#example4177').mask(00000);
        $('#example7009').mask(AA);
        this.onClick()
    }

    render() {
        return (
            <form action="/action_page.php" target="_blank">
                First name:<br />
                <input type="text" name="firstname" value="John" placeholder="_____" maxlength="5" id="example4177" /><br />
                        Last name:<br />
                <input type="text" name="lastname" value="Doe" placeholder="__" maxlength="2" id="example7009" />
                <br /><br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}