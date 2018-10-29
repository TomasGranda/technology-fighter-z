import axios from "axios";

import {
  GET_CHARACTERS,
  SELECT_CHARACTER,
  UNSELECT_CHARACTER,
  ADD_CHARACTER,
  GET_ERRORS,
  CLEAR_ERRORS,
  LOADING_CHARACTERS,
  CLEAR_SELECTION
} from "./types";

export const getCharacters = () => dispatch => {
  dispatch(setCharactersLoading());

  axios
    .get("/api/characters")
    .then(res =>
      dispatch({
        type: GET_CHARACTERS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_CHARACTERS,
        payload: err
      })
    );
};

export const selectCharacter = characterId => dispatch => {
  dispatch({
    type: SELECT_CHARACTER,
    payload: characterId
  });
};

export const unselectCharacter = characterId => dispatch => {
  dispatch({
    type: UNSELECT_CHARACTER,
    payload: characterId
  });
};

export const addCharacter = character => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/characters", character)
    .then(res =>
      dispatch({
        type: ADD_CHARACTER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// Set loading state
export const setCharactersLoading = () => {
  return {
    type: LOADING_CHARACTERS
  };
};

// Clear selection
export const clearSelection = () => {
  return {
    type: CLEAR_SELECTION
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};