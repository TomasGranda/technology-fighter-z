import React, { Component } from 'react';
import { connect } from "react-redux";

import { Grid, Row, Col, Panel } from "react-bootstrap";

import SelectionView from "../SelectionView/SelectionView";
import CharacterCard from "../Character/CharacterCard";

import { getCharacters } from "../../actions/characterActions";
import { createSocket } from "../../actions/multiplayerActions";

import CountDown from 'react-countdown-clock'
import './Room.css';

class Room extends Component {

    componentDidMount() {
        this.props.getCharacters();
    }

    getCharacter = (id) => {
        if (id) {
            const { characters } = this.props.character;
            let selected = characters.find((ch) => {
                return ch._id === id;
            });
            return selected;
        } else {
            return {
                _id: "",
                icon: "",
                name: "",
                classType: "",
                life: "",
                defense: "",
                attack: "",
                speed: ""
            };
        }
    }

    emitCountdownComplete = () => {
        let { socket, roomId} = this.props;
        socket.emit("countdown_complete", { roomId });
    };

    render() {
        const { yourSelect, enemySelect, countdown } = this.props;
        let select1 = this.getCharacter(yourSelect);
        let select2 = this.getCharacter(enemySelect);
        let renderCountdown;

        if(countdown){
            renderCountdown = <CountDown 
                showMilliseconds={false} 
                seconds={5} 
                color="#000" 
                alpha={0.9} 
                size={150}
                onComplete={this.emitCountdownComplete} />;
        } else {
            renderCountdown = <div />;
        }

        return (
            <Grid fluid>
                <Row>
                    <Col xs={4} >
                        <Panel>
                            <Panel.Heading>
                                You
                            </Panel.Heading>
                            <Panel.Body>
                                <CharacterCard
                                    id={select1._id}
                                    icon={select1.icon}
                                    name={select1.name || "Select a Character"}
                                    classType={select1.classType}
                                    life={select1.life}
                                    defense={select1.defense}
                                    attack={select1.attack}
                                    speed={select1.speed}
                                    selectable={false}
                                />
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col xs={4} className="countdown">
                        {renderCountdown}
                    </Col>
                    <Col xs={4} >
                        <Panel>
                            <Panel.Heading>
                                Enemy
                            </Panel.Heading>
                            <Panel.Body>
                                <CharacterCard
                                    id={select2._id}
                                    icon={select2.icon}
                                    name={select2.name || "Select a Character"}
                                    classType={select2.classType}
                                    life={select2.life}
                                    defense={select2.defense}
                                    attack={select2.attack}
                                    speed={select2.speed}
                                    selectable={false}
                                />
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <SelectionView />
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    character: state.character,
    socket: state.multiplayer.socket,
    roomId: state.multiplayer.room.joined,
    yourSelect: state.multiplayer.room.yourSelect,
    enemySelect: state.multiplayer.room.enemySelect,
    countdown: state.multiplayer.room.countdown
});

export default connect(mapStateToProps, { getCharacters, createSocket })(Room);