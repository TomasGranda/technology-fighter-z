import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Row, Col, Form, Button } from "react-bootstrap";

import { addCharacter } from "../../actions/characterActions";
import { showSnackBar } from "../../utils/showSnackBar";

import CharacterCard from "../Character/CharacterCard";
import SnackBar from "../SnackBar/Snackbar";
import Input from "../Input/Input";
import SelectInput from "../SelectInput/SelectInput";

import * as settings from "../../config/settings.json";
import * as icons from "../../config/icons.json";

class CreateCharacter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxPoints: settings.maxPoints - 4,
      name: "",
      icon: "",
      characterStats: {
        life: 1,
        defense: 1,
        attack: 1,
        speed: 1
      },
      snackbar: {
        displaySnackbar: false,
        message: "",
        type: ""
      }
    };
  }

  componentDidUpdate() {
    let points = settings.maxPoints - this.getTotalPoints();

    if (points !== this.state.maxPoints) {
      this.setState({
        maxPoints: points
      });
    }

    if (this.state.snackbar.displaySnackbar) {
      this.setState({
        snackbar: {
          ...this.state.snackbar,
          displaySnackbar: false
        }
      });

      const snackbar = document.getElementById("snackbar");
      showSnackBar(snackbar);
    }
  }

  getTotalPoints = () => {
    let total = 0;

    for (let key in this.state.characterStats) {
      total += this.state.characterStats[key];
    }

    return total;
  };

  handleChangeStats = e => {
    let value = Number(e.target.value);
    let points = this.getTotalPoints() - this.state.characterStats[e.target.name] + value;

    if (points <= settings.maxPoints && value > 0) {
      this.setState({
        characterStats: {
          ...this.state.characterStats,
          [e.target.name]: value
        }
      });
    }
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
  };

  handleClick = () => {
    if (this.validateCreate()) {
      this.setState({
        name: "",
        icon: "",
        characterStats: {
          life: 1,
          defense: 1,
          attack: 1,
          speed: 1
        }
      });

      let character = {
        name: this.state.name,
        icon: this.state.icon,
        life: this.state.characterStats.life * 50,
        defense: this.state.characterStats.defense * 5,
        attack: this.state.characterStats.attack * 5,
        speed: this.state.characterStats.speed * 5
      };

      this.props.addCharacter(character);

      this.setState({
        snackbar: {
          ...this.state.snackbar,
          displaySnackbar: true,
          type: "success",
          message: "Character created"
        }
      });
    }
  };

  validateCreate = () => {
    let result = true;
    let error = "";

    if (this.state.maxPoints !== 0) {
      error = "You must assign all points";
      result = false;
    } else if (this.state.name === "") {
      error = "You must enter a name";
      result = false;
    } else if (this.state.icon === "") {
      error = "You must select a icon";
      result = false;
    }

    if (!result) {
      this.setState({
        snackbar: {
          ...this.state.snackbar,
          displaySnackbar: true,
          type: "warning",
          message: error
        }
      });
    }

    return result;
  };

  render() {
    const { name, icon, maxPoints, characterStats } = this.state;
    const { message, type } = this.state.snackbar;
    const calculateLife = characterStats.life * 50;

    const calculateStat = stat => {
      return stat * 5;
    };

    const iconsList = icons.map((icon, i) => {
      return (
        <option key={i} value={icon.icon}>
          {icon.name}
        </option>
      );
    });

    return (
      <React.Fragment>
        <Grid>
          <Row>
            <Col sm={6}>
              <Form horizontal>
                <Input
                  title="Name"
                  icon="N"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  maxLength="20"
                  help="Name of character"
                />
                <SelectInput
                  title="Icon"
                  icon={<i className={icon ? icon : "fas fa-hand-pointer"} />}
                  onChange={this.handleSelect}
                  list={iconsList}
                  help="Icon of character"
                />
                <Input
                  title="Max Points"
                  icon={<i className="fab fa-product-hunt" />}
                  type="number"
                  name="maxPoints"
                  value={maxPoints}
                  readOnly={true}
                  help="Points to assign to Stats"
                />
                <Input
                  title="Life"
                  icon={<i className="fa fa-heart" />}
                  type="number"
                  name="life"
                  value={characterStats.life}
                  onChange={this.handleChangeStats}
                  min="1"
                  help="Life of character. 1 pt = 50 HP"
                />
                <Input
                  title="Defense"
                  icon={<i className="fa fa-shield-alt" />}
                  type="number"
                  name="defense"
                  value={characterStats.defense}
                  onChange={this.handleChangeStats}
                  min="1"
                  help="Defense of character. 1 pt = 5 Def"
                />
                <Input
                  title="Attack"
                  icon={<i className="fa fa-fire" />}
                  type="number"
                  name="attack"
                  value={characterStats.attack}
                  onChange={this.handleChangeStats}
                  min="1"
                  help="Attack of character. 1 pt = 5 Atk"
                />
                <Input
                  title="Speed"
                  icon={<i className="fas fa-tachometer-alt" />}
                  type="number"
                  name="speed"
                  value={characterStats.speed}
                  onChange={this.handleChangeStats}
                  min="1"
                  help="Speed of character. 1 pt = 5 Speed"
                />
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
              <Button onClick={this.handleClick} bsStyle="primary" block>
                Create
              </Button>
            </Col>
          </Row>
        </Grid>
        <SnackBar type={type} message={message} id="snackbar" />
      </React.Fragment>
    );
  }
}

CreateCharacter.propTypes = {
  addCharacter: PropTypes.func.isRequired
};

export default connect(null, { addCharacter })(CreateCharacter);