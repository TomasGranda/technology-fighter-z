import React from "react";
import PropTypes from "prop-types";

import {
  Col,
  ControlLabel,
  FormGroup,
  FormControl,
  InputGroup,
  HelpBlock
} from "react-bootstrap";

const SelectInput = props => {
  return (
    <FormGroup>
      <Col componentClass={ControlLabel} sm={3}>
        {props.title}
      </Col>
      <Col componentClass={ControlLabel} sm={9}>
        <InputGroup>
          <InputGroup.Addon>{props.icon}</InputGroup.Addon>
          <FormControl
            componentClass="select"
            placeholder="select"
            onChange={props.onChange}
          >
            <option value="">Select</option>
            {props.list}
          </FormControl>
        </InputGroup>
        <HelpBlock>{props.help}</HelpBlock>
      </Col>
    </FormGroup>
  );
};

SelectInput.defaultProps = {
  help: "",
  onChange: () => {}
};

SelectInput.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  list: PropTypes.array.isRequired,
  help: PropTypes.string,
  onChange: PropTypes.func
};

export default SelectInput;