import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { Provider } from "react-redux";

import CharacterList from '../Character/CharacterList';
import NavbarApp from '../NavbarApp/NavbarApp';

import store from "../../store";

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <NavbarApp />
          <Grid>
            <Row>
              <CharacterList />
            </Row>
          </Grid>
        </div>
      </Provider>
    );
  };
};

export default App;