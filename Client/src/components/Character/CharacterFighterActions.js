import * as keyboards from "../../config/keyboards.json";
import { showSome } from "../../utils/showSome";

class CharacterFighterActions {
  constructor(bind) {
    this.bind = bind;
    this.socket = this.bind.props.socket;
    if (this.socket) {
      this.socket.on("enemy_action", (data) => {
        this.makeAction(null, data.action, true)
      });
    }
  }

  makeAttack = (online) => {
    if (this.attackProgress === 100 || online) {
      this.handleAttack();
      if (this.socket && !online) {
        this.socket.emit("make_action", { action: "attack", roomId: this.bind.props.roomId })
      }
    }
  }

  makeUltimate = (online) => {
    if (this.specialProgress === 100 || online) {
      this.handleUltimate();
      if (this.socket && !online) {
        this.socket.emit("make_action", { action: "ultimate", roomId: this.bind.props.roomId })
      }
    }
  }

  makeSkill = (online, skillNumber) => {
    if (this.attackProgress === 100 || online) {
      this.handleSkill1();
      if (this.socket && !online) {
        this.socket.emit("make_action", { action: "skill1", roomId: this.bind.props.roomId })
      }
    }
  }

  makeAction = (e, action, online) => {
    let keyCode;
    if (e) {
      keyCode = e.keyCode;
    } else if (action) {
      switch (action) {
        case "attack":
          keyCode = keyboards.attack2;
          break;
        case "ultimate":
          keyCode = keyboards.ultimate2;
          break;
        case "skill1":
          keyCode = keyboards.skill12;
          break;
        default:
          break;
      }
    } else {
      keyCode = "";
    }

    switch (keyCode) {
      case keyboards.attack1: // q => attack first player
        if (this.bind.props.numberCharacter === 0) {
          this.makeAttack();
        }
        break;
      case keyboards.attack2: // i => attack second player
        if (this.bind.props.numberCharacter === 1) {
          this.makeAttack(online);
        }
        break;
      case keyboards.ultimate1: // e => special first player
        if (this.bind.props.numberCharacter === 0) {
          this.makeUltimate();
        }
        break;
      case keyboards.ultimate2: // p => special second player
        if (this.bind.props.numberCharacter === 1) {
          this.makeUltimate(online);
        }
        break;
      case keyboards.skill11: // w => skill1 first player
        if (this.bind.props.numberCharacter === 0) {
          this.makeSkill(null, 1);
        }
        break;
      case keyboards.skill12: // o => skill1 second player
        if (this.bind.props.numberCharacter === 1) {
          this.makeSkill(online, 1);
        }
        break;
      default:
        break;
    }
  };

  handleAttack = () => {
    const { numberCharacter } = this.bind.props;

    this.bind.props.attack(numberCharacter);

    const characters = document.getElementsByClassName("fight");
    showSome(characters[numberCharacter], `attack${numberCharacter}`, 1000);
    const oponent = numberCharacter === 1 ? 0 : 1;
    showSome(characters[oponent], "damage", 2000);

    this.bind.loadingAttack();
  };

  handleUltimate = () => {
    const { numberCharacter } = this.bind.props;

    this.bind.props.ultimate(numberCharacter);

    const characters = document.getElementsByClassName("fight");
    showSome(characters[numberCharacter], `ultimate${numberCharacter}`, 2000);
    const oponent = numberCharacter === 1 ? 0 : 1;
    showSome(characters[oponent], "damageU", 4000);

    this.bind.loadingSpecial();
  };

  handleSkill1 = () => {
    const { numberCharacter } = this.bind.props;

    this.bind.props.skill1(numberCharacter);

    this.bind.loadingAttack();
  };
};

export default CharacterFighterActions;