import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProgressBar, ButtonGroup, Button } from 'react-bootstrap';

import Character from './Character';

import { getCharacterById } from '../../utils/getCharacterById';

class CharacterFighter extends Component {
  constructor(props) {
    super(props);

    let character = getCharacterById(this.props.id);

    this.state = {
      life: character.life,
      icon: character.icon,
      divisor: (100 / character.life)
    }
  }


  render() {
    const { life, icon, divisor } = this.state;

    return (
      <div>
        <ProgressBar now={(life * divisor)} label={`${life}`} />
        <Character icon={icon} size='200px' />
        <br />
        <ButtonGroup vertical>
          <Button block>Attack 1</Button>
          <Button block>Attack 2</Button>
          <Button block>Attack 3</Button>
          <Button block>Attack 4</Button>
        </ButtonGroup>
      </div>
    )
  }
}

CharacterFighter.propTypes = {
  id: PropTypes.string.isRequired
};

export default CharacterFighter;