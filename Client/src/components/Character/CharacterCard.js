import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel, Button } from 'react-bootstrap';

import { selectCharacter, unselectCharacter } from '../../actions/characterActions';

class CharacterCard extends Component {
  constructor(props){
    super(props);

    this.state = {
      selection: false
    }
  };

  handleClick = () => {
    const { selection } = this.state;
    const { id, selectCharacter, unselectCharacter } = this.props;

    if (selection) {
      unselectCharacter(id);
    } else {
      selectCharacter(id);
    }

    this.setState(prevState => ({
      selection: !prevState.selection
    }));
  }

  render(){
    const { selection } = this.state;
    const { id, icon, name, life, defense, attack, speed, selectable } = this.props;
    let button;

    if (selectable) {
      if (selection) {
        button = (
          <Button onClick={this.handleClick} bsStyle="danger" block>Unselect</Button>
        );
      } else {
        button = (
          <Button onClick={this.handleClick} bsStyle="primary" block>Select</Button>
        );
      };
    }

    return (
      <Panel id={`${id}`} height="30px">
        <Panel.Heading>
          <Panel.Title componentClass="h3"><i className={icon} /> {name}</Panel.Title>
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

CharacterCard.defaultProps = {
  selectable: true
}

CharacterCard.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  life: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  attack: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  selectCharacter: PropTypes.func.isRequired,
  unselectCharacter: PropTypes.func.isRequired,
  selectable: PropTypes.bool,
};

export default connect(null, { selectCharacter, unselectCharacter })(CharacterCard);