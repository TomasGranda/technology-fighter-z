import React from "react";
import PropTypes from "prop-types";

import InfoButton from "../InfoButton/InfoButton";

import {
  Col,
  ControlLabel,
  FormGroup,
  FormControl,
  InputGroup,
  HelpBlock
} from "react-bootstrap";

const SelectInput = props => {
  let help;
  if(props.hover){
    help =  <InfoButton hover={props.hover} help={props.help} />;
  }else{
    help = props.help;
  }
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
        <HelpBlock>{help}</HelpBlock>
      </Col>
    </FormGroup>
  );
};

SelectInput.defaultProps = {
  hover: "",
  help: "",
  onChange: () => {}
};

SelectInput.propTypes = {
  hover: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  list: PropTypes.array.isRequired,
  help: PropTypes.string,
  onChange: PropTypes.func
};

export default SelectInput;