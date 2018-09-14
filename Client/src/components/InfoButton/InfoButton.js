import React, { Component } from 'react';

import { ButtonToolbar, OverlayTrigger, Popover } from "react-bootstrap";

class InfoButton extends Component {
    render() {
        const popoverRight = (
            <Popover id="popover-positioned-right" title="Effects">
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