import {
  LOAD_CHARACTERS,
  ATTACK_0,
  ATTACK_1,
  ULTIMATE_0,
  ULTIMATE_1,
  SET_WINNER,
  CLEAR_FIGHT
} from "./types";

import { getCharacterById } from "../utils/getCharacterById";

export const loadCharacters = (characters, id1, id2) => dispatch => {
  let payload = [];

  payload.push(getCharacterById(characters, id1));
  payload.push(getCharacterById(characters, id2));

  dispatch({
    type: LOAD_CHARACTERS,
    payload: payload
  });
};

export const attack = numberCharacter => dispatch => {
  if (numberCharacter === 0) {
    dispatch({
      type: ATTACK_0
    });
  } else {
    dispatch({
      type: ATTACK_1
    });
  }
};

export const ultimate = numberCharacter => dispatch => {
  if (numberCharacter === 0) {
    dispatch({
      type: ULTIMATE_0
    });
  } else {
    dispatch({
      type: ULTIMATE_1
    });
  }
};

export const setWinner = id => dispatch => {
  dispatch({
    type: SET_WINNER,
    payload: id + 1
  });
};

// Clear fight
export const clearFight = () => {
  return {
    type: CLEAR_FIGHT
  };
};