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

const Input = props => {
  return (
    <FormGroup>
      <Col componentClass={ControlLabel} sm={3}>
        {props.title}
      </Col>
      <Col componentClass={ControlLabel} sm={9}>
        <InputGroup>
          <InputGroup.Addon>{props.icon}</InputGroup.Addon>
          <FormControl
            placeholder={props.placeholder}
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            min={props.min}
            maxLength={props.maxLength}
            readOnly={props.readOnly}
          />
        </InputGroup>
        <HelpBlock>{props.help}</HelpBlock>
      </Col>
    </FormGroup>
  );
};

Input.defaultProps = {
  placeholder: "",
  help: "",
  min: "",
  maxLength: "",
  onChange: () => {},
  readOnly: false
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  help: PropTypes.string,
  min: PropTypes.string,
  maxLength: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool
};

export default Input;