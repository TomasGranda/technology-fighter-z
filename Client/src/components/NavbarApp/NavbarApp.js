import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  setHome,
  setCreateCharacter,
  setFight,
  setSettings,
  setMultiplayer
} from "../../actions/sectionActions";

import { Navbar, Nav, NavItem } from "react-bootstrap";

const NavbarApp = props => {
  const { setMultiplayer, setHome, setCreateCharacter, setFight, setSettings } = props;

  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <span className="cursor-clicked" onClick={setHome}>
            Technology Fighter Z
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#" onClick={setCreateCharacter}>
            Create character
          </NavItem>
          <NavItem eventKey={2} href="#" onClick={setFight}>
            Fight
          </NavItem>
          <NavItem eventKey={3} href="#" onClick={setSettings}>
            Settings
          </NavItem>
          <NavItem eventKey={4} href="#" onClick={setMultiplayer}>
            Multiplayer
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarApp.propTypes = {
  setHome: PropTypes.func.isRequired,
  setCreateCharacter: PropTypes.func.isRequired,
  setFight: PropTypes.func.isRequired,
  setSettings: PropTypes.func.isRequired
};

export default connect(null, { setHome, setCreateCharacter, setFight, setSettings, setMultiplayer })(NavbarApp);