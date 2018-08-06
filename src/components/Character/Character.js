import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Character.css';

class Character extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {name, life, defense, attack} = this.props;

    return (
      <div>
        <h2>{name}</h2>
        <h5>Life: {life}</h5>
        <h5>Defense: {defense}</h5>
        <h5>Attack: {attack}</h5>
      </div>
    );
  };
};

Character.propTypes = {
  name: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  attack: PropTypes.number.isRequired
};

export default Character;