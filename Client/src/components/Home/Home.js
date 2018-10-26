import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Grid, Row, Col } from "react-bootstrap";

import { setSettings } from "../../actions/sectionActions";

import create from "../../assets/CreateCharacter.jpg";
import select from "../../assets/SelectCharacter.jpg";
import fight from "../../assets/Fight.jpg";

import "./Home.css";

const Home = props => {
  const { setSettings } = props;

  return (
    <Grid>
      <Row>
        <Col sm={2} />
        <Col sm={8}>
          <center>
            <h1><strong>Technology Fighter Z</strong></h1>
            <p>The game in which you can create your own characters and fight against your friends</p>
            <hr />
            <h3><strong>Create your character</strong></h3>
            <img src={create} alt="Create character" width="500px"></img>
            <hr />
            <h3><strong>Select characters</strong></h3>
            <img src={select} alt="Select characters" width="500px"></img>
            <hr />
            <h3><strong>Fight with them</strong></h3>
            <img src={fight} alt="Fight" width="500px"></img>
            <hr />
            <h4>Don't forget read the <span className="link" onClick={setSettings}>controls</span> before the fight</h4>
            <br />
          </center>
        </Col>
        <Col sm={2} />
      </Row>
    </Grid>
  );
};

Home.propTypes = {
  setSettings: PropTypes.func.isRequired
};

export default connect(null, { setSettings })(Home);