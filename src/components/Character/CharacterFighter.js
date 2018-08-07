import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Character from './Character';

class CharacterFighter extends Component {
  render() {
    const { icon } = this.props;

    return (
      <div>
        <Character icon={icon} size='200px' />
      </div>
    )
  }
}

CharacterFighter.propTypes = {
  icon: PropTypes.string.isRequired
};

export default CharacterFighter;