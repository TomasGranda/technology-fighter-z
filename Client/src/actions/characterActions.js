import axios from 'axios';

import { 
  GET_CHARACTERS,
  SELECT_CHARACTER,
  UNSELECT_CHARACTER,
  ADD_CHARACTER,
  GET_ERRORS,
  CLEAR_ERRORS,
  LOADING_CHARACTERS
} from './types';

export const getCharacters = () => dispatch => {
  dispatch(setCharactersLoading());
  
  axios
    .get('/api/characters')
    .then(res => 
      dispatch({
          type: GET_CHARACTERS,
          payload: res.data
      })
    )
    .catch(() => 
      dispatch({
          type: GET_CHARACTERS,
          payload: null
      })
    );
};

export const selectCharacter = character => dispatch => {
  dispatch({
    type: SELECT_CHARACTER,
    payload: character
  });
};

export const unselectCharacter = character => dispatch =>{
  dispatch({
    type: UNSELECT_CHARACTER,
    payload: character
  });
};

export const addCharacter = character => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/characters', character)
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

// Clear errors
export const clearErrors = () => {
  return {
      type: CLEAR_ERRORS
  };
};