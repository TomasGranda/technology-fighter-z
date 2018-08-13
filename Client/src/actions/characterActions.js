import { 
  SELECT_CHARACTER,
  UNSELECT_CHARACTER
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