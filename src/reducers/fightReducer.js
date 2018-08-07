import { 
  LOAD_CHARACTERS,
  ATTACK_0,
  ATTACK_1
} from '../actions/types';

import { calculateDamage } from '../utils/calculateDamage';

const initialState = {
  characters: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHARACTERS:
      return {
        ...state,
        characters: action.payload
      }
    case ATTACK_0:
      return {
        ...state,
        characters: { 
          ...state.characters,
          1 : {
            ...state.characters[1],
            life: (state.characters[1].life - calculateDamage(state.characters[0].attack, state.characters[1].defense))
          }
        }
      }
    case ATTACK_1:
      return {
        ...state,
        characters: { 
          ...state.characters,
          0 : {
            ...state.characters[0],
            life: (state.characters[0].life - calculateDamage(state.characters[1].attack, state.characters[0].defense))
          }
        }
      }
    default:
      return state;
  }
};