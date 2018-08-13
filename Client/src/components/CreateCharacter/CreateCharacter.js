import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Grid, Row, Col, ControlLabel, Form, FormGroup, FormControl, InputGroup, HelpBlock, Button } from 'react-bootstrap';

import { addCharacter } from '../../actions/characterActions';
import { showSnackBar } from '../../utils/showSnackBar';

import CharacterCard from '../Character/CharacterCard';
import SnackBar from '../SnackBar/Snackbar';

import * as settings from '../../config/settings.json';
import * as icons from '../../config/icons.json';

class CreateCharacter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxPoints: settings.maxPoints,
      name: '',
      icon: '',
      characterStats: {
        life: 1,
        defense: 1,
        attack: 1,
        speed: 1,
        ultimate: 1
      },
      error: '',
      displaySnackbar: false
    };
  };

  componentDidUpdate() {
    let points = settings.maxPoints - this.getTotalPoints();

    if (points !== this.state.maxPoints ) {
      this.setState({
        maxPoints: points
      });
    };

    if (this.state.displaySnackbar) {
      this.setState({
        displaySnackbar: false
      });

      const snackbar = document.getElementById("snackbar");
      showSnackBar(snackbar);
    }
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

  handleSelect = e => {
    e.preventDefault();

    this.setState({
      icon: e.target.value
    });
  }

  handleClick = () => {
    if (this.validateCreate()) {
      this.setState({
        name: '',
        characterStats: {
          life: 1,
          defense: 1,
          attack: 1,
          speed: 1,
          ultimate: 1
        }
      });

      let character = {
        "name": this.state.name,
        "icon": this.state.icon,
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
    } else if (this.state.name === '') {
      error = 'You must enter a name';
      result = false;
    } else if (this.state.icon === '') {
      error = "You must select a icon";
      result = false;
    };

    if (!result) {
      this.setState({
        error: error,
        displaySnackbar: true
      });
    };

    return result;
  };

  render() {
    const { name, icon, maxPoints, characterStats, error } = this.state;
    const calculateLife = characterStats.life * 50;

    const calculateStat = stat => {
      return stat * 5
    };

    const iconsList = icons.map((icon, i) => {
      return (<option key={i} value={icon.icon}>{icon.name}</option>)
    });

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
                    <InputGroup.Addon>N</InputGroup.Addon>
                    <FormControl type="text" name="name" value={name} onChange={this.handleChange} />
                  </InputGroup>
                  <HelpBlock>Name of character</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Icon
                </Col>
                <Col componentClass={ControlLabel} sm={9}>       
                  <InputGroup>
                    <InputGroup.Addon><i className={icon} /></InputGroup.Addon>           
                    <FormControl componentClass="select" placeholder="select" onChange={this.handleSelect}>
                      <option value="select">Select</option>
                      {iconsList}
                    </FormControl>
                  </InputGroup>
                  <HelpBlock>Icon of character</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Max Points
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fab fa-product-hunt"/></InputGroup.Addon>
                    <FormControl type="number" name="maxPoints" value={maxPoints} readOnly />
                  </InputGroup>
                  <HelpBlock>Points to assign</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Life
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fa fa-heart"/></InputGroup.Addon>
                    <FormControl type="number" name="life" value={characterStats.life} onChange={this.handleChageStats} min="1" />
                  </InputGroup>
                  <HelpBlock>Life of character. 1 pt = 50 HP</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Defense
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fa fa-shield-alt"/></InputGroup.Addon>
                    <FormControl type="number" name="defense" value={characterStats.defense} onChange={this.handleChageStats} min="1" />
                  </InputGroup>
                  <HelpBlock>Defense of character. 1 pt = 5 Def</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Attack
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fa fa-fire"/></InputGroup.Addon>
                    <FormControl type="number" name="attack" value={characterStats.attack} onChange={this.handleChageStats} min="1" />
                  </InputGroup>
                  <HelpBlock>Attack of character. 1 pt = 50 Atk</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Speed
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fas fa-tachometer-alt"/> </InputGroup.Addon>
                    <FormControl type="number" name="speed" value={characterStats.speed} onChange={this.handleChageStats} min="1" />
                  </InputGroup>
                  <HelpBlock>Speed of character. 1 pt = 50 Speed.</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>
                  Ultimate
                </Col>
                <Col componentClass={ControlLabel} sm={9}>
                  <InputGroup>
                    <InputGroup.Addon><i className="fas fa-surprise"/> </InputGroup.Addon>
                    <FormControl type="number" name="ultimate" value={characterStats.ultimate} onChange={this.handleChageStats} min="1" />
                  </InputGroup>
                  <HelpBlock>Ultimate of character. 1 pt = 5 U</HelpBlock>
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Col sm={6}>
            <CharacterCard  
              id="0"
              icon={icon}
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
          </Col>
        </Row>
        <SnackBar type="warning" message={error} />
      </Grid>
    )
  }
}

CreateCharacter.propTypes = {
  addCharacter: PropTypes.func.isRequired
};

export default connect(null, { addCharacter })(CreateCharacter);