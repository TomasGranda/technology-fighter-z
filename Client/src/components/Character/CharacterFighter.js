import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProgressBar, Button } from 'react-bootstrap';

import { attack, ultimate } from '../../actions/fightActions';

import Character from './Character';

import { getCharacterById } from '../../utils/getCharacterById';
import { calculateSpeedSpecial } from '../../utils/calculateSpeedSpecial';

import * as keyboards from '../../config/keyboards.json';

class CharacterFighter extends Component {
  constructor(props) {
    super(props);

    let character = getCharacterById(this.props.charactersList, this.props.id);

    this.state = {
      life: character.life,
      divisorLife: (100 / character.life),
      icon: character.icon,
      speed:  character.speed,
      specialProgress: 0,
      attackProgress: 0
    };

    this.loadingAttack();
    this.loadingSpecial();
  };

  componentDidMount() {
    window.addEventListener("keydown", this.makeAttack);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.makeAttack);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fight) {
      let lifeAux = nextProps.fight.characters[this.props.numberCharacter].life;

      if (lifeAux < 0) {
        lifeAux = 0;
      };

      this.setState({
        life: lifeAux
      });
    };
  };

  makeAttack = e => {
    let keyCode = e.keyCode;
    
    switch (keyCode) {
      // q => attack first player
      case keyboards.attack1:
        if (this.props.numberCharacter === 0 && this.state.attackProgress === 100) this.handleClick();
        break;
      // o => attack second player
      case keyboards.attack2:
        if (this.props.numberCharacter === 1  && this.state.attackProgress === 100) this.handleClick();
        break;
      // w => special first player
      case keyboards.ultimate1:
        if (this.props.numberCharacter === 0  && this.state.specialProgress === 100) this.handleUltimate();
        break;
      // p => special second player
      case keyboards.ultimate2:
        if (this.props.numberCharacter === 1  && this.state.specialProgress === 100) this.handleUltimate();
        break;
      default:
        break;
    }
  };

  handleClick = () => {
    this.props.attack(this.props.numberCharacter);

    this.loadingAttack();
  };

  handleUltimate = () => {
    this.props.ultimate(this.props.numberCharacter);

    this.loadingSpecial();
  };

  loadingAttack = () => {
    let time = 250 / calculateSpeedSpecial(this.state.speed);

    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        this.setState({
          attackProgress: i
        })
      }, time * i);
    };
  };

  loadingSpecial = () => {
    let time = 1000 / calculateSpeedSpecial(this.state.speed);

    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        this.setState({
          specialProgress: i
        })
      }, time * i);
    };
  };

  
  render() {
    const { life, icon, divisorLife, attackProgress, specialProgress } = this.state;
    let dead = (life === 0 ? true : false);

    let ultimate;
    if (specialProgress === 100) {
      ultimate = <Button onClick={this.handleUltimate} block>Ultimate</Button>
    } else {
      ultimate = <Button onClick={this.handleUltimate} block disabled>Ultimate</Button>
    };

    let attack;
    if (attackProgress === 100) {
      attack = <Button onClick={this.handleClick} block>Attack</Button>
    } else {
      attack = <Button onClick={this.handleClick} block disabled>Attack</Button>
    };
    

    return (
      <div>
        <ProgressBar now={(life * divisorLife)} label={`${(Math.round(life))}`} />
        <Character icon={icon} size="200px" dead={dead} />
        <hr />
        <ProgressBar bsStyle="success without-transition" now={attackProgress} label={`${attackProgress}`} />  
        {attack}
        <hr />
        <ProgressBar bsStyle="warning without-transition" now={specialProgress} label={`${specialProgress}`} />
        {ultimate}
      </div>
    );
  };
};

CharacterFighter.propTypes = {
  id: PropTypes.string.isRequired,
  numberCharacter: PropTypes.number.isRequired,
  fight: PropTypes.object.isRequired,
  attack: PropTypes.func.isRequired,
  ultimate: PropTypes.func.isRequired,
  charactersList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  fight: state.fight,
  charactersList: state.character.characters
});

export default connect(mapStateToProps, { attack, ultimate })(CharacterFighter);