import React from "react";
import PropTypes from "prop-types";

const Character = props => {
  let content;

  if (props.dead) {
    content = <i className="fas fa-trash" style={{ fontSize: props.size }} />;
  } else {
    content = <i className={props.icon} style={{ fontSize: props.size }} />;
  }

  return <div className={`margin-top-25 ${props.className}`}>{content}</div>;
};

Character.defaultProps = {
  size: "14px",
  dead: false,
  className: ""
};

Character.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string,
  dead: PropTypes.bool,
  className: PropTypes.string
};

export default Character;
