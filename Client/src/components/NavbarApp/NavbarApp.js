import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from "react-redux";

import { setHome, setCreateCharacter, setFight } from '../../actions/sectionActions';

const NavbarApp = props => {
  const { setHome, setCreateCharacter, setFight } = props;

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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarApp.propTypes = {
  setHome: PropTypes.func.isRequired,
  setCreateCharacter: PropTypes.func.isRequired,
  setFight: PropTypes.func.isRequired
};

export default connect(null, { setHome, setCreateCharacter, setFight })(NavbarApp);