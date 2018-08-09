import { 
  SET_HOME,
  SET_CREATE_CHARACTER,
  SET_FIGHT
} from './types';

export const setHome = () => dispatch => {
  dispatch({
    type: SET_HOME
  });
};

export const setCreateCharacter = () => dispatch => {
  dispatch({
    type: SET_CREATE_CHARACTER
  });
};

export const setFight = () => dispatch => {
  dispatch({
    type: SET_FIGHT
  });
};