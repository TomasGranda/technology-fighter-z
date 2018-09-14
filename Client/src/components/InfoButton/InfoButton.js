import React, { Component } from 'react';

import { Panel, Button, ButtonToolbar, OverlayTrigger, Popover } from "react-bootstrap";

class InfoButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const popoverRight = (
            <Popover id="popover-positioned-right" title="Efectos">
                {this.props.hover.map( (ps) => {
                    return <p>{ps}</p>;
                })}
            </Popover>
        );

        return (
            <ButtonToolbar>
                {this.props.help + " "}
                <OverlayTrigger trigger="hover" placement="right" overlay={popoverRight}>
                    <i class="fas fa-question-circle"></i>
                </OverlayTrigger>
            </ButtonToolbar>
        );
    }
}

export default InfoButton;