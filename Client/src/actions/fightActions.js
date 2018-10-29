import {
  LOAD_CHARACTERS,
  ATTACK_0,
  ATTACK_1,
  SKILL1_0,
  SKILL1_1,
  ULTIMATE_0,
  ULTIMATE_1,
  SET_WINNER,
  CLEAR_FIGHT
} from "./types";

import { getCharacterById } from "../utils/getCharacterById";
import { triggerInitialSkills } from "../utils/skills/triggerInitialSkills";

import store from "../store";

const getMultiplayer = () => {
  return store.getState().multiplayer;
};

export const loadCharacters = (characters, id1, id2) => dispatch => {
  let payload = [];

  let character1 = getCharacterById(characters, id1);
  let character2 = getCharacterById(characters, id2);

  const buffedCharacters = triggerInitialSkills(character1, character2);

  payload.push(buffedCharacters[0]);
  payload.push(buffedCharacters[1]);

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

export const skill1 = numberCharacter => dispatch => {
  if (numberCharacter === 0) {
    dispatch({
      type: SKILL1_0
    });
  } else {
    dispatch({
      type: SKILL1_1
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
