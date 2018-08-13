import React from 'react';
import PropTypes from 'prop-types';

const Character = props => {
  let content;
  
  if (props.dead) {
    content = (<i className="fas fa-trash" style={{ fontSize: props.size }} />);
  } else {
    content = (<i className={props.icon} style={{ fontSize: props.size }} />);
  }

  return (
    <div>
      {content}
    </div>
  );
};

Character.defaultProps = {
  size: '14px',
  dead: false
};

Character.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  dead: PropTypes.bool
};

export default Character;