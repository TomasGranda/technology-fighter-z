import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Table, Grid, Row, Col } from 'react-bootstrap';

import { createSocket } from "../../actions/multiplayerActions";
import EmitEvents from './EmitEvents';

class GlobalLobby extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			challenges: [],
			error: ""
		}

		this.EmitEvents = new EmitEvents(this);
	}

	componentDidUpdate = () => {
		const { users, challenges } = this.props;
		if (this.state.users.length !== users.length) {
			this.setState({
				users
			});
		}
		if (this.state.challenges.length !== challenges.length) {
			this.setState({
				challenges
			});
		}
	};

	render() {
		const { users, challenges, error } = this.state;
		let userRows = <div/>;
		let challengesRows = <div/>;

		if (users) {
			userRows = users.map((user, index) => {
				return (
					<tr key={index}>
						<td>{user.username}</td>
						<td>algomas</td>
						<td>
							<center>
								<i style={{ cursor: "pointer" }} className="far fa-envelope" onClick={() => this.EmitEvents.sendChallenge(user.id)} />
							</center>
						</td>
					</tr>
				);
			});
		}
		if (challenges) {
			challengesRows = challenges.map((challenge, index) => {
				return (
					<tr key={index}>
						<td>{challenge.challengerName}</td>
						<td>
							<i className="fas fa-check" style={{ color: "green", cursor: "pointer" }} onClick={() => this.EmitEvents.acceptChallenge(index)} />/<i className="fas fa-ban" style={{ color: "red", cursor: "pointer" }} />
						</td>
					</tr>
				);
			});
		}

		return (
			<Grid>
				<Row>
					<Col xs={2}>
						<input id="username" placeholder="Username"></input>
						<p style={{ color: "red" }}>{error}</p>
						<button onClick={this.EmitEvents.handleConnect}>Conectar</button>
						<button onClick={this.EmitEvents.handleChangeUsername}>Cambiar Nombre</button>
						<button onClick={this.EmitEvents.getUsers}>Refrescar</button>
					</Col>
					<Col xs={7}>
						<Panel>
							<Panel.Heading>
								Usuarios
                            </Panel.Heading>
							<Panel.Body>
								<Table bordered>
									<thead>
										<tr>
											<th>
												Nombre
                      </th>
											<th>
												Otracosa
                      </th>
											<th style={{ width: "1px" }}>
												Inv.
                      </th>
										</tr>
									</thead>
									<tbody>
										{userRows}
									</tbody>
								</Table>
							</Panel.Body>
						</Panel>
					</Col>
					<Col xs={3}>
						<Panel>
							<Panel.Heading>
								Invitaciones
                            </Panel.Heading>
							<Panel.Body>
								<Table bordered>
									<thead>
										<tr>
											<th className="col-md-9">
												Usuario
                      </th>
											<th className="col-md-3">
												<i className="fas fa-check" style={{ color: "green" }} />/<i className="fas fa-ban" style={{ color: "red" }} />
											</th>
										</tr>
									</thead>
									<tbody>
										{challengesRows}
									</tbody>
								</Table>
							</Panel.Body>
						</Panel>
					</Col>
				</Row>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	socket: state.multiplayer.socket,
	users: state.multiplayer.users,
	challenges: state.multiplayer.challenges
});

export default connect(mapStateToProps, { createSocket })(GlobalLobby);