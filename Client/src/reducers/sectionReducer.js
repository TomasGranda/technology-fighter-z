import { 
  SET_HOME,
  SET_CREATE_CHARACTER,
  SET_FIGHT
} from '../actions/types';

import * as section from '../config/section.json';

const initialState = {
  section: section.home
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_HOME:
      return({
        ...state,
        section: section.home
      });
    case SET_CREATE_CHARACTER:
      return({
        ...state,
        section: section.createCharacter
      });
    case SET_FIGHT:
      return({
        ...state,
        section: section.fight
      });
    default:
      return state;
  }
};