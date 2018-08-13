import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid, Row, Col, ControlLabel, Form, FormGroup, FormControl, InputGroup,Button } from 'react-bootstrap';

import { addCharacter } from '../../actions/characterActions';

import CharacterCard from '../Character/CharacterCard';

import * as settings from '../../config/settings.json';

class CreateCharacter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxPoints: settings.maxPoints,
      name: '',
      characterStats: {
        life: 0,
        defense: 0,
        attack: 0,
        speed: 0,
        ultimate: 0
      },
      error: ''
    };
  };

  componentDidUpdate() {
    let points = settings.maxPoints - this.getTotalPoints();

    if (points !== this.state.maxPoints ) {
      this.setState({
        maxPoints: points
      });
    };
  };

  getTotalPoints = () => {
    let total = 0;

    for (let key in this.state.characterStats) {
      total += this.state.characterStats[key];
    };

    return total;
  };

  handleChageStats = e => {
    let value = Number(e.target.value);
    let operation = (this.state.characterStats[e.target.name] > value ? -1 : 1);
    let points = this.getTotalPoints() + operation;

    if (points <= settings.maxPoints) {
      this.setState({ characterStats: {
        ...this.state.characterStats,
        [e.target.name]: value }
      });
    };
  };

  handleChange = e => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value 
    });
  };

  handleClick = () => {
    if (this.validateCreate()) {
      this.setState({
        name: '',
        characterStats: {
          life: 0,
          defense: 0,
          attack: 0,
          speed: 0,
          ultimate: 0
        },
        error: ''
      });

      let character = {
        "icon": "fas fa-times-circle",
        "name": this.state.characterStats.name,
        "life": this.state.characterStats.life * 50,
        "defense": this.state.characterStats.defense,
        "attack": this.state.characterStats.attack,
        "speed": this.state.characterStats.speed,
        "ultimate": this.state.characterStats.ultimate
      }

      this.props.addCharacter(character);
    };
  };

  validateCreate = () => {
    let result = true;
    let error = '';

    if (this.state.maxPoints !== 0) {
      error = 'You must assign all points';
      result = false;
    } else if(this.state.name === '') {
      error = 'You must enter a name';
      result = false;
    };

    if (!result) {
      this.setState({
        error: error
      });
    };

    return result;
  };

  render() {
    const { name, maxPoints, characterStats, error } = this.state;
    const calculateLife = characterStats.life * 50;
    const calculateStat = stat => {
      return stat * 5
    }

    return (
      <Grid>
        <Row>
          <Col sm={6}>
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Name
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fab fa-product-hunt"/></InputGroup.Addon>
                    <FormControl type="text" name="name" value={name} onChange={this.handleChange} />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Max Point
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fab fa-product-hunt"/></InputGroup.Addon>
                    <FormControl type="number" name="maxPoints" value={maxPoints} readOnly />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Life
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fa fa-heart"/></InputGroup.Addon>
                    <FormControl type="number" name="life" value={characterStats.life} onChange={this.handleChageStats} min="0" />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Defense
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fa fa-shield-alt"/></InputGroup.Addon>
                    <FormControl type="number" name="defense" value={characterStats.defense} onChange={this.handleChageStats} min="0" />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Attack
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fa fa-fire"/></InputGroup.Addon>
                    <FormControl type="number" name="attack" value={characterStats.attack} onChange={this.handleChageStats} min="0" />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Speed
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fas fa-tachometer-alt"/> </InputGroup.Addon>
                    <FormControl type="number" name="speed" value={characterStats.speed} onChange={this.handleChageStats} min="0" />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Ultimate
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fas fa-surprise"/> </InputGroup.Addon>
                    <FormControl type="number" name="ultimate" value={characterStats.ultimate} onChange={this.handleChageStats} min="0" />
                  </InputGroup>
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Col sm={6}>
            <CharacterCard  
              id="0"
              icon="fas fa-times-circle"
              name={name}
              life={calculateLife}
              defense={calculateStat(characterStats.defense)}
              attack={calculateStat(characterStats.attack)}
              speed={calculateStat(characterStats.speed)}
              selectable={false}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Button onClick={this.handleClick} bsStyle="primary" block>Create</Button>
            <p>{error}</p>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default connect(null, { addCharacter })(CreateCharacter);