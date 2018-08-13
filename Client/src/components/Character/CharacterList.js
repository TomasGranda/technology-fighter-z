import React from 'react';
import { Col } from 'react-bootstrap';

import CharacterCard from './CharacterCard';

import * as charactersJSON from '../../config/characters.json';

const CharacterList = () => {
  const characters = charactersJSON.map((character, i) => {
    return (
      <Col xs={3} key={i}>
        <CharacterCard 
          id={character.id}
          icon={character.icon}
          name={character.name}
          life={character.life} 
          defense={character.defense} 
          attack={character.attack}
          speed={character.speed}
        />
      </Col>
    )
  })

  return characters;
}

export default CharacterList;
