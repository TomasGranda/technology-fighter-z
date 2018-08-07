import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProgressBar, ButtonGroup, Button } from 'react-bootstrap';

import Character from './Character';

import { getCharacterById } from '../../utils/getCharacterById';
import { attack } from '../../actions/fightActions';

class CharacterFighter extends Component {
  constructor(props) {
    super(props);

    let character = getCharacterById(this.props.id);

    this.state = {
      life: character.life,
      icon: character.icon,
      divisor: (100 / character.life)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fight) {
      let lifeAux = nextProps.fight.characters[this.props.numberCharacter].life;

      if (lifeAux < 0) {
        lifeAux = 0;
      }

      this.setState({
        life: lifeAux
      })
    }
  }

  handleClick = () => {
    this.props.attack(this.props.numberCharacter);
  }

  render() {
    const { life, icon, divisor } = this.state;

    return (
      <div>
        <ProgressBar now={(life * divisor)} label={`${life}`} />
        <Character icon={icon} size='200px' />
        <br />
        <ButtonGroup vertical>
          <Button onClick={this.handleClick} block>Attack 1</Button>
        </ButtonGroup>
      </div>
    )
  }
}

CharacterFighter.propTypes = {
  id: PropTypes.string.isRequired,
  numberCharacter: PropTypes.number.isRequired,
  fight: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  fight: state.fight
});

export default connect(mapStateToProps, { attack })(CharacterFighter);