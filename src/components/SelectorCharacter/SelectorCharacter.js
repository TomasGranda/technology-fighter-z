import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import charactersJSON from '../../config/characters.json';

class SelectorCharacter extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: '',
      selectCharacter: null
    }
  }

  getValidationState = () => {
    let character = false;
    let stateInput;
    
    for(let element of charactersJSON) {
      if (element.id === this.state.value) {
        character = true;
        break;
      }
    };

    if (this.state.value === '') {
      stateInput = null;
    } else if (character) {
      stateInput = 'success';
    } else {
      stateInput = 'error';
    };

    return stateInput;
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { selectCharacter, value } = this.state;

    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Select character</ControlLabel>
          <FormControl
            type="text"
            value={value}
            placeholder="Write ID of character"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Please, enter ID of character.</HelpBlock>
          <HelpBlock>{selectCharacter}</HelpBlock>
        </FormGroup>
      </form>
    )
  }
}

SelectorCharacter.propTypes = {

}

export default  SelectorCharacter;