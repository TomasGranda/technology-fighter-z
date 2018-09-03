import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setFight } from "../../actions/sectionActions";
import { selectCharacter } from "../../actions/characterActions";

import { Modal, Button } from "react-bootstrap";

class GameOver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      winner: null,
      player1: props.fight.characters[0]._id,
      player2: props.fight.characters[1]._id
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.fight.characters[0].life <= 0 || props.fight.characters[1].life <= 0) {
      const winner =
        props.fight.characters[0].life <= 0
          ? props.fight.characters[1]
          : props.fight.characters[0];
      return {
        show: true,
        winner: winner
      };
    }

    return state;
  }

  handlePlayAgain = () => {
    this.props.setFight();

    setTimeout(() => {
      this.props.selectCharacter(this.state.player1);
      this.props.selectCharacter(this.state.player2);
    }, 100);    

    this.setState({
      show: false,
      winner: null
    });
  };

  handleClose = () => {
    this.props.setFight();

    this.setState({
      show: false,
      winner: null
    });
  };

  render() {
    const { show, winner } = this.state;

    return (
      <div className="static-modal">
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              The winner is {winner ? winner.name : ""}!
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.handlePlayAgain}>Play Again!</Button>
            <Button onClick={this.handleClose}>Select Characters</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

GameOver.propTypes = {
  fight: PropTypes.object.isRequired,
  setFight: PropTypes.func.isRequired,
  selectCharacter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fight: state.fight
});

export default connect(mapStateToProps, { setFight, selectCharacter })(GameOver);