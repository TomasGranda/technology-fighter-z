import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setFight } from "../../actions/sectionActions";
import { selectCharacter } from "../../actions/characterActions";
import { setModal } from "../../actions/fightActions";

import { Modal, Button } from "react-bootstrap";

class GameOver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      winner: null,
      player1: props.fight.characters[0]._id,
      player2: props.fight.characters[1]._id,
      rematch: false,
      selectCharacter: false
    };
  }
  componentDidUpdate() {
    const { fight, show, setModal } = this.props;
    if (fight.characters &&
      !show &&
      fight.characters[1] &&
      (fight.characters[0].life <= 0 || fight.characters[1].life <= 0)
    ) {
      setModal();
    }
  };

  handlePlayAgain = (online) => {
    const { socket, roomId } = this.props;

    if (online) {
      socket.emit("rematch", { roomId })
      this.setState({
        rematch: true
      });
    } else {
      this.props.setFight();

      setTimeout(() => {
        this.props.selectCharacter(this.state.player1);
        this.props.selectCharacter(this.state.player2);
      }, 100);

      this.setState({
        show: false,
        winner: null
      });
    }
  };

  handleSelectCharacters = (online) => {
    const { socket, roomId } = this.props;

    if (online) {
      socket.emit("change_characters", { roomId })
      this.setState({
        selectCharacter: true
      });
    } else {
      this.props.setFight();
    }
  };

  render() {
    const { winner, rematch, selectCharacter } = this.state;
    const { section, show } = this.props;

    let buttons = (
      <Modal.Footer>
        <Button onClick={() => this.handlePlayAgain(false)}>Play Again!</Button>
        <Button onClick={() => this.handleSelectCharacters(false)}>Select Characters</Button>
      </Modal.Footer>
    );
    if (section === 4) {
      buttons = (
        <Modal.Footer>
          {rematch || selectCharacter ? <Button onClick={() => this.handlePlayAgain(section)} bsStyle="success" disabled>Play Again!</Button> : <Button onClick={() => this.handlePlayAgain(section)}>Play Again!</Button>}
          {rematch || selectCharacter ? <Button onClick={() => this.handleSelectCharacters(true)} bsStyle="success" disabled>Select Characters</Button> : <Button onClick={() => this.handleSelectCharacters(true)}>Select Characters</Button>}
          <Button onClick={this.handleExit}>Exit</Button>
        </Modal.Footer>
      );
    }

    return (
      <div className="static-modal">
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              The winner is {winner ? winner.name : ""}!
            </Modal.Title>
          </Modal.Header>
          {buttons}
        </Modal>
      </div>
    );
  }
}

GameOver.propTypes = {
  fight: PropTypes.object.isRequired,
  setFight: PropTypes.func.isRequired,
  selectCharacter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  fight: state.fight,
  section: state.section.section,
  socket: state.multiplayer.socket,
  roomId: state.multiplayer.room.joined,
  show: state.fight.modalShow
});

export default connect(mapStateToProps, { setFight, selectCharacter, setModal })(GameOver);