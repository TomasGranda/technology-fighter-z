import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

import CharacterList from '../Character/CharacterList';
import NavbarApp from '../NavbarApp/NavbarApp';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavbarApp />
        <Grid>
          <Row>
            <CharacterList />
          </Row>
        </Grid>
      </div>
    );
  };
};

export default App;