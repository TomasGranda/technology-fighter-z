import axios from 'axios';

import { 
  SELECT_CHARACTER,
  UNSELECT_CHARACTER,
  ADD_CHARACTER,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

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


// Clear errors
export const clearErrors = () => {
  return {
      type: CLEAR_ERRORS
  }
}