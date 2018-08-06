import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import './Character.css';

const Character = props => {
  const { id, icon, name, life, defense, attack, speed } = props;

  return (
    <Panel id={id} >
      <Panel.Heading>
        <Panel.Title componentClass="h3"><i class={icon} /> {name}</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <p><i class="fa fa-heart"/>  {life}</p>
        <p><i class="fa fa-shield-alt"/>  {defense}</p>
        <p><i class="fa fa-fire"/> {attack}</p>
        <p><i class="fas fa-tachometer-alt"/> {speed}</p>
      </Panel.Body>
    </Panel>
  );
};

Character.propTypes = {
  id: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  attack: PropTypes.number.isRequired,
  spedd: PropTypes.number.isRequired
};

export default Character;