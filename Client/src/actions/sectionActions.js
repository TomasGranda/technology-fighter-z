import { SET_HOME, SET_CREATE_CHARACTER, SET_FIGHT, SET_SETTINGS } from "./types";

import { clearSelection } from "./characterActions";
import { clearFight } from "./fightActions";

export const setHome = () => dispatch => {
  clearAll(dispatch);
  dispatch({
    type: SET_HOME
  });
};

export const setCreateCharacter = () => dispatch => {
  clearAll(dispatch);
  dispatch({
    type: SET_CREATE_CHARACTER
  });
};

export const setFight = () => dispatch => {
  clearAll(dispatch);
  dispatch({
    type: SET_FIGHT
  });
};

export const setSettings = () => dispatch => {
  clearAll(dispatch);
  dispatch({
    type: SET_SETTINGS
  });
};

const clearAll = dispatch => {
  dispatch(clearFight());
  dispatch(clearSelection());
};