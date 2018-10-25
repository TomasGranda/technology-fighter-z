import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SelectionView from "../SelectionView/SelectionView";
import FightView from "../FightView/FightView";
import Home from "../Home/Home";
import CreateCharacter from "../CreateCharacter/CreateCharacter";
import Settings from "../Settings/Settings";

import * as sectionJSON from "../../config/section.json";
import Room from "../Room/Room";
import GlobalLobby from "../GlobalLobby/GlobalLobby";

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
      section: props.section
    };
  }
  
  render() {
    const { selected, section } = this.props;
    let content;
    switch (section) {
      case sectionJSON.home:
        content = <Home />;
        break;
      case sectionJSON.createCharacter:
        content = <CreateCharacter />;
        break;
      case sectionJSON.fight:
        if (selected.length === 2) {
          content = <FightView />;
        } else {
          content = <SelectionView />;
        }
        break;
      case sectionJSON.settings:
        content = <Settings />;
        break;
      case sectionJSON.multiplayer:
        if (this.props.fightInit) {
          content = <FightView />;
        } else if (this.props.joined) {
          content = <Room />;
        } else {
          content = <GlobalLobby />;
        }
        break;
      default:
        break;
    }
    return <div>{content}</div>;
  }
}

Content.propTypes = {
  selected: PropTypes.array.isRequired,
  section: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  selected: state.character.selected,
  section: state.section.section,
  joined: state.multiplayer.room.joined,
  fightInit: state.multiplayer.room.fight.init
});

export default connect(mapStateToProps, null)(Content);