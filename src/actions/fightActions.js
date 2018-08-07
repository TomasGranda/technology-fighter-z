import { 
  LOAD_CHARACTERS,
  ATTACK_0,
  ATTACK_1,
  ULTIMATE_0,
  ULTIMATE_1
} from './types';

import { getCharacterById } from '../utils/getCharacterById';

export const loadCharacters = (id1, id2) => dispatch => {
  let payload = [];

  payload.push(getCharacterById(id1));
  payload.push(getCharacterById(id2));

  dispatch({
    type: LOAD_CHARACTERS,
    payload: payload
  });
};

export const attack = numberCharacter => dispatch => {
  if (numberCharacter === 0) {
    dispatch({
      type: ATTACK_0
    })
  } else {
    dispatch({
      type: ATTACK_1
    })
  }
};

export const ultimate = numberCharacter => dispatch => {
  if (numberCharacter === 0) {
    dispatch({
      type: ULTIMATE_0
    })
  } else {
    dispatch({
      type: ULTIMATE_1
    })
  }
};