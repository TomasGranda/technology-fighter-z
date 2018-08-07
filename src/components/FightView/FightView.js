import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import CharacterFighter from '../Character/CharacterFighter';

import { getCharacterById } from '../../utils/getCharacterById';

class FightView extends Component {
  render() {
    const { character } = this.props;
    const characters = character.selected.map((id, i) => {
      let character = getCharacterById(id);
      return (
        <CharacterFighter
          key={i} 
          icon={character.icon} 
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

export default connect(mapStateToProps, null)(FightView);