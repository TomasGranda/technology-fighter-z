import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loadCharacters } from "../../actions/fightActions";

import { Grid, Row, Col } from "react-bootstrap";
import CharacterFighter from "../Character/CharacterFighter";
import GameOver from "../GameOver/GameOver";

class FightView extends Component {
  render() {
    const { character, loadCharacters, multiplayerRoom } = this.props;
    let selected;
    if (multiplayerRoom.joined) {
      selected = [multiplayerRoom.yourSelect, multiplayerRoom.enemySelect]
    } else {
      selected = character.selected;
    }
    loadCharacters(character.characters, selected[0], selected[1]);

    const characters = selected.map((id, i) => {
      return <CharacterFighter key={i} id={id} numberCharacter={i} />;
    });


    return (
      <div>
        <GameOver />
        <Grid className="text-center">
          <Row>
            <Col xs={4}>{characters[0]}</Col>
            <Col xs={4} />
            <Col xs={4}>{characters[1]}</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

FightView.propTypes = {
  character: PropTypes.object.isRequired,
  loadCharacters: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  character: state.character,
  section: state.section.section,
  multiplayerRoom: state.multiplayer.room
});

export default connect(mapStateToProps, { loadCharacters })(FightView);