export const getCharacterById = (characters, id) => {
  let character = characters.find(element => {
    return element._id === id;
  });

  return character;
};