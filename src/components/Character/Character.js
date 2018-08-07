import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Button } from 'react-bootstrap';

import './Character.css';

class Character extends Component {
  constructor(props){
    super(props);

    this.state = {
      selection: false
    }
  };

  handleClick = () => {
    this.setState(prevState => ({
      selection: !prevState.selection
    }));
  }

  render(){
    const { selection } = this.state;
    const { id, icon, name, life, defense, attack, speed } = this.props;
    let button;

    if (selection) {
      button = (
        <Button onClick={this.handleClick} bsStyle="danger" block>Unselect</Button>
      );
    } else {
      button = (
        <Button onClick={this.handleClick} bsStyle="primary" block>Select</Button>
      );
    };

    return (
      <Panel id={`${id}`} height="30px">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{id} <i className={icon} /> {name}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <p><i className="fa fa-heart"/>  {life}</p>
          <p><i className="fa fa-shield-alt"/>  {defense}</p>
          <p><i className="fa fa-fire"/> {attack}</p>
          <p><i className="fas fa-tachometer-alt"/> {speed}</p>
          {button}
        </Panel.Body>
      </Panel>
    );
  }
};

Character.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  attack: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired
};

export default Character;