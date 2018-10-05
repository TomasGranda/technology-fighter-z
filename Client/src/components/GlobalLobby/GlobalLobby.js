import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Table, Grid, Row, Col } from 'react-bootstrap';

import { createSocket } from "../../actions/multiplayerActions";

class GlobalLobby extends Component {

    getUsers = () => {
        let socket = this.props.socket;
        socket.emit("get_users");
    };

    handleConnect = () => {
        const username = document.getElementById("username").value || "Player";
        this.props.createSocket(document.getElementById("ip").value, username);
    };

    handleChangeUsername = () => {
        const username = document.getElementById("username").value || "Player";
        let socket = this.props.socket;
        socket.emit("change_username", { username: username });
    };

    render() {
        const users = this.props.users;
        let rows;

        if (users) {
            rows = users.map(user => {
                return (
                <tr>
                    <td>{user}</td>
                    <td>algomas</td>
                    <td>
                        <center><i style={{ cursor: "pointer" }} class="far fa-envelope" /></center>
                    </td>
                </tr>
                );
            });
        }

        return (
            <Grid>
                <Row>
                    <Col xs={3}>
                        <input id="username" placeholder="Username"></input>
                        <input id="ip" placeholder="IP" />
                        <button onClick={this.handleConnect}>Connect</button>
                        <button onClick={this.handleChangeUsername}>Change Username</button>
                        <button onClick={this.getUsers}>Refresh</button>
                    </Col>
                    <Col xs={6}>
                        <Panel>
                            <Panel.Heading>
                                Users
                            </Panel.Heading>
                            <Panel.Body>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>
                                                Name
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
                                        {rows}
                                    </tbody>
                                </Table>
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col xs={3} />
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    socket: state.multiplayer.socket,
    users: state.multiplayer.users
});

export default connect(mapStateToProps, { createSocket })(GlobalLobby);