import React, { Component } from 'react';

import Character from './Character';

import charactersJSON from '../../config/characters.json';

class CharacterList extends Component {
  render() {
    const characters = charactersJSON.map((character, i) => {
      return (
        <Character 
          key={i}
          name={character.name}
          life={character.life} 
          defense={character.defense} 
          attack={character.attack}
        />
      )
    })

    return characters;
  }
}

export default CharacterList;
