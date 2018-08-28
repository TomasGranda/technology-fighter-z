import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Modal, Button } from "react-bootstrap";
import { setHome, setCreateCharacter, setFight } from '../../actions/sectionActions';

class GameOver extends Component {
	constructor() {
		super();

		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false
		}
	}

	static getDerivedStateFromProps(nextProps){
		if(nextProps.fight.characters[0].life <= 0 || nextProps.fight.characters[1].life <= 0){
			return {
				show: true
			}
		}
	}

	handleClose() {
		
	}

	render() {
		return (
			<div className="static-modal">
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header>
						<Modal.Title>Modal title</Modal.Title>
					</Modal.Header>

					<Modal.Body>One fine body...</Modal.Body>

					<Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  fight: state.fight
});

export default connect(mapStateToProps)(GameOver)