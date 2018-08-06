import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import './Character.css';

const Character = props => {
  const {name, life, defense, attack} = props;

  return (
    <Panel bsStyle="info">
      <Panel.Heading>
        <Panel.Title componentClass="h3">{name}</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <p>Life: {life}</p>
        <p>Defense: {defense}</p>
        <p>Attack: {attack}</p>
      </Panel.Body>
    </Panel>
  );
};

Character.propTypes = {
  name: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  attack: PropTypes.number.isRequired
};

export default Character;