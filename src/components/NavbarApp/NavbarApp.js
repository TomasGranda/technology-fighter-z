import React from 'react';
import { Navbar } from 'react-bootstrap';

const NavbarApp = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="http://localhost:3000">Technology Fighter Z</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    </Navbar>
  );
};

export default NavbarApp;