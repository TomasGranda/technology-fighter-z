import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import './Character.css';

const Character = props => {
  const { id, icon, name, life, defense, attack, speed } = props;

  return (
    <Panel id={`${id}`} >
      <Panel.Heading>
        <Panel.Title componentClass="h3">{id} <i className={icon} /> {name}</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <p><i className="fa fa-heart"/>  {life}</p>
        <p><i className="fa fa-shield-alt"/>  {defense}</p>
        <p><i className="fa fa-fire"/> {attack}</p>
        <p><i className="fas fa-tachometer-alt"/> {speed}</p>
      </Panel.Body>
    </Panel>
  );
};

Character.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  attack: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired
};

export default Character;