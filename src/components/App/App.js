import React, { Component } from 'react';

import CharacterList from '../Character/CharacterList';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        GAME
        <CharacterList />
      </div>
    );
  };
};

export default App;