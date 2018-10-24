import React, { Component } from 'react';
import { connect } from "react-redux";

import { Grid, Row, Col, Panel } from "react-bootstrap";

import SelectionView from "../SelectionView/SelectionView";
import CharacterCard from "../Character/CharacterCard";

import { getCharacters } from "../../actions/characterActions";
import { createSocket } from "../../actions/multiplayerActions";

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

    render() {
        const { yourSelect, enemySelect } = this.props;
        let select1 = this.getCharacter(yourSelect);
        let select2 = this.getCharacter(enemySelect);
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
                    <Col xs={4} />
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
                    <SelectionView/>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    character: state.character,
    socket: state.multiplayer.socket,
    yourSelect: state.multiplayer.room.yourSelect,
    enemySelect: state.multiplayer.room.enemySelect
});

export default connect(mapStateToProps, { getCharacters, createSocket })(Room);