import React from "react";
import PropTypes from "prop-types";

import "./Spinner.css";

const Spinner = props => {
  return (
    <div>
      <img
        className={`spinner ${props.class}`}
        src={props.src}
        alt="Loading..."
        width={props.width}
      />
    </div>
  );
};

Spinner.defaultProps = {
  width: "",
  class: ""
};

Spinner.propTypes = {
  src: PropTypes.string.isRequired,
  class: PropTypes.string,
  width: PropTypes.string
};

export default Spinner;