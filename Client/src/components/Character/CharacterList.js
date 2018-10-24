import React from "react";
import PropTypes from "prop-types";

import { Col } from "react-bootstrap";
import CharacterCard from "./CharacterCard";

const CharacterList = props => {
  const characters = props.characters.map((character, i) => {
    return (
      <Col xs={3} key={i}>
        <CharacterCard
          id={character._id}
          icon={character.icon}
          name={character.name}
          classType={character.classType}
          life={character.life}
          defense={character.defense}
          attack={character.attack}
          speed={character.speed}
        />
      </Col>
    );
  });

  return characters;
};

CharacterList.propTypes = {
  characters: PropTypes.array.isRequired
};

export default CharacterList;
