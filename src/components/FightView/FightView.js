import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import CharacterFighter from '../Character/CharacterFighter';

import { loadCharacters } from '../../actions/fightActions';

class FightView extends Component {
  render() {
    const { character, loadCharacters } = this.props;

    loadCharacters(character.selected[0], character.selected[1]);
    
    const characters = character.selected.map((id, i) => {
      return (
        <CharacterFighter
          key={i} 
          id={id} 
          numberCharacter={i}
        />
      );
    });

    return (
      <div>
        <Grid style={{ textAlign: 'center' }} >
          <Row>
            <Col xs={4}>
              {characters[0]}
            </Col>
            <Col xs={4} />
            <Col xs={4}>
              {characters[1]}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

FightView.propTypes = {
  character: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  character: state.character
});

export default connect(mapStateToProps, { loadCharacters })(FightView);