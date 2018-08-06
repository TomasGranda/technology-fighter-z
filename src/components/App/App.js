import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

import CharacterList from '../Character/CharacterList';

import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <CharacterList />
        </Row>
      </Grid>
    );
  };
};

export default App;