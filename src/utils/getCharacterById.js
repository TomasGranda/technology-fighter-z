import charactersJSON from '../config/characters.json';

export const getCharacterById = id => {
  let character = charactersJSON.find((element) => {
    return element.id === id;
  });

  return character;
}