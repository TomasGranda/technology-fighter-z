import React from 'react';
import { Col } from 'react-bootstrap';

import Character from './Character';

import charactersJSON from '../../config/characters.json';

const CharacterList = () => {
  const characters = charactersJSON.map((character, i) => {
    return (
      <Col xs={4} >
        <Character 
          key={i}
          name={character.name}
          life={character.life} 
          defense={character.defense} 
          attack={character.attack}
        />
      </Col>
    )
  })

  return characters;
}

export default CharacterList;
