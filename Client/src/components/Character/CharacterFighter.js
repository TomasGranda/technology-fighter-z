import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ProgressBar, Button } from "react-bootstrap";

import { attack, skill1, ultimate } from "../../actions/fightActions";
import CharacterFighterActions from "./CharacterFighterActions";

import Character from "./Character";
import CharacterBuffIcon from "./CharacterBuffIcon";

import { calculateSpeedSpecial } from "../../utils/calculateSpeedSpecial";
import { getCharacterById } from "../../utils/getCharacterById";

import "./CharacterFighter.css";

class CharacterFighter extends Component {
  constructor(props) {
    super(props);

    let character = getCharacterById(this.props.charactersList, this.props.id);

    this.state = {
      life: character.life,
      divisorLife: 100 / character.life,
      icon: character.icon,
      speed: character.speed,
      specialProgress: 0,
      attackProgress: 0
    };

    this.actions = new CharacterFighterActions(this)
    this.loadingAttack();
    this.loadingSpecial();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.actions.makeAction);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.actions.makeAction);
  }

  componentDidUpdate() {
    this.actions.specialProgress = this.state.specialProgress;
    this.actions.attackProgress = this.state.attackProgress;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.fight) {
      let lifeAux = props.fight.characters[props.numberCharacter].life;

      if (lifeAux < 0) {
        lifeAux = 0;
      }

      if (props.fight.characters[0].life < 0 || props.fight.characters[1].life < 0)
        window.removeEventListener("keydown", CharacterFighter.makeAttack);

      return {
        ...state,
        life: lifeAux
      };
    }
  }

  loadingAttack = () => {
    if (this.state.attackProgress === 100 || this.state.attackProgress === 0) {
      let time = 250 / calculateSpeedSpecial(this.state.speed);

      for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
          this.setState({
            attackProgress: i
          });
        }, time * i);
      }
    }
  };

  loadingSpecial = () => {
    if (this.state.specialProgress === 100 || this.state.specialProgress === 0) {
      let time = 1000 / calculateSpeedSpecial(this.state.speed);

      for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
          this.setState({
            specialProgress: i
          });
        }, time * i);
      }
    }
  };

  render() {
    const { life, icon, divisorLife, attackProgress, specialProgress } = this.state;
    const { numberCharacter } = this.props;
    let dead = life === 0 ? true : false;

    let ultimate;
    if (specialProgress === 100) {
      ultimate = (
        <Button onClick={() => this.actions.makeUltimate()} block>
          Ultimate
        </Button>
      );
    } else {
      ultimate = (
        <Button onClick={() => this.actions.makeUltimate()} block disabled>
          Ultimate
        </Button>
      );
    }

    let attack;
    if (attackProgress === 100) {
      attack = (
        <Button onClick={() => this.actions.makeAttack(null, "attack")} block>
          Attack
        </Button>
      );
    } else {
      attack = (
        <Button onClick={() => this.actions.makeAttack(null, "attack")} block disabled>
          Attack
        </Button>
      );
    }

    let skill1;
    if (attackProgress === 100) {
      skill1 = (
        <Button onClick={this.actions.handleSkill1} block>
          Skill 1
        </Button>
      );
    } else {
      skill1 = (
        <Button onClick={this.actions.handleSkill1} block disabled>
          Skill 1
        </Button>
      );
    }

    return (
      <div>
        <ProgressBar className="margin-bottom-0" now={life * divisorLife} label={`${Math.round(life)}`} />
        <CharacterBuffIcon character={numberCharacter} />
        <Character className="fight" icon={icon} size="200px" dead={dead} />
        <hr />
        <ProgressBar
          bsStyle="success"
          bsClass="without-transition progress-bar"
          now={attackProgress}
          label={`${attackProgress}`}
        />
        <div className="basicActionButtonList">
          {attack}
          {skill1}
        </div>
        <hr />
        <ProgressBar
          bsStyle="warning"
          bsClass="without-transition progress-bar"
          now={specialProgress}
          label={`${specialProgress}`}
        />
        {ultimate}
      </div>
    );
  }
}

CharacterFighter.propTypes = {
  id: PropTypes.string.isRequired,
  numberCharacter: PropTypes.number.isRequired,
  fight: PropTypes.object.isRequired,
  attack: PropTypes.func.isRequired,
  skill1: PropTypes.func.isRequired,
  ultimate: PropTypes.func.isRequired,
  charactersList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  fight: state.fight,
  charactersList: state.character.characters,
  socket: state.multiplayer.socket,
  roomId: state.multiplayer.room.joined
});

export default connect(mapStateToProps, { attack, skill1, ultimate })(CharacterFighter);