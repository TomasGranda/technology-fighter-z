import React, { Component } from 'react';
import { connect } from "react-redux";

import { OverlayTrigger, Popover } from "react-bootstrap";

import "./CharacterBuffIcon.css";

class CharacterBuffIcon extends Component {
    getBuffIcon = (buff) => {
        switch (buff.stat) {
            case "life":
                return "fa fa-heart";
            case "attack":
                return "fa fa-fire";
            case "speed":
                return "fas fa-tachometer-alt";
            case "defense":
                return "fa fa-shield-alt";
        }
    }

    generatePopover = (buff) => {
        return (
            <Popover id="popover-positioned-top">
                {buff.stat}: {buff.buff > 0 ? `+${buff.buff}` : buff.buff}
            </Popover>
        );
    }

    render() {
        const buffs = this.props.charactersList[this.props.character].buff.map(buff => {
            const popoverTop = this.generatePopover(buff);
            return (
                <span>
                    <i className={`${this.getBuffIcon(buff)} stat`} />
                    <OverlayTrigger trigger="hover" placement="top" overlay={popoverTop}>
                        <i class={`${buff.buff > 0 ? "fas fa-angle-double-up buff" : "fas fa-angle-double-down debuff"}`} />
                    </OverlayTrigger>
                </span>
            );
        });
        return (
            <div className="bufflist">
                {buffs}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    charactersList: state.fight.characters
});

export default connect(mapStateToProps)(CharacterBuffIcon);