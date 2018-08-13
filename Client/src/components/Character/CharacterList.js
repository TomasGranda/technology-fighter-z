import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import CharacterCard from './CharacterCard';

const CharacterList = props => {
  let characters = (<p>Loading...</p>);

  if (props.characters.length !== 0) {
    characters = props.characters.map((character, i) => {
      return (
        <Col xs={3} key={i}>
          <CharacterCard 
            id={character._id}
            icon={character.icon}
            name={character.name}
            life={character.life} 
            defense={character.defense} 
            attack={character.attack}
            speed={character.speed}
          />
        </Col>
      );
    });
  };

  return characters;
};

CharacterList.propTypes = {
  characters: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  characters: state.character.characters
});

export default connect(mapStateToProps)(CharacterList);
