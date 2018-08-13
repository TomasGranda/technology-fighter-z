import { 
  SET_HOME,
  SET_CREATE_CHARACTER,
  SET_FIGHT
} from './types';

import { clearSelection } from './characterActions';
import { clearFight } from './fightActions';

export const setHome = () => dispatch => {
  dispatch(clearFight());
  dispatch(clearSelection());
  dispatch({
    type: SET_HOME
  });
};

export const setCreateCharacter = () => dispatch => {
  dispatch(clearFight());
  dispatch(clearSelection());
  dispatch({
    type: SET_CREATE_CHARACTER
  });
};

export const setFight = () => dispatch => {
  dispatch(clearFight());
  dispatch(clearSelection());
  dispatch({
    type: SET_FIGHT
  });
};