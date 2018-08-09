import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';

class CreateCharacter extends Component {
  render() {
    return (
      <form>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><i className="fa fa-heart"/></InputGroup.Addon>
            <FormControl type="text" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><i className="fa fa-shield-alt"/></InputGroup.Addon>
            <FormControl type="text" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><i className="fa fa-fire"/></InputGroup.Addon>
            <FormControl type="text" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><i className="fas fa-tachometer-alt"/> </InputGroup.Addon>
            <FormControl type="text" />
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

export default CreateCharacter;