import React from 'react';
import PropTypes from 'prop-types';

const Character = props => {
  return (
    <div>
      <i className={props.icon} style={{ fontSize: props.size }} />
    </div>
  );
};

Character.defaultProps = {
  size: '14px'
};

Character.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string
};

export default Character;