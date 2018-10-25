import {
  LOAD_CHARACTERS,
  CLEAR_FIGHT,
  ATTACK_0,
  ATTACK_1,
  SKILL1_0,
  SKILL1_1,
  ULTIMATE_0,
  ULTIMATE_1,
  SET_WINNER
} from "../actions/types";

import { calculateDamage } from "../utils/calculateDamage";
import { triggerActiveSkills } from "../utils/skills/triggerActiveSkills";

const initialState = {
  characters: [],
  winner: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHARACTERS:
      return {
        ...state,
        characters: action.payload
      };
    case CLEAR_FIGHT:
      return {
        characters: [],
        winner: null
      };
    case ATTACK_0:
      return {
        ...state,
        characters: {
          ...state.characters,
          1: {
            ...state.characters[1],
            life:
              state.characters[1].life -
              calculateDamage(
                state.characters[0].attack,
                state.characters[1].defense
              )
          }
        }
      };
    case ATTACK_1:
      return {
        ...state,
        characters: {
          ...state.characters,
          0: {
            ...state.characters[0],
            life:
              state.characters[0].life -
              calculateDamage(
                state.characters[1].attack,
                state.characters[0].defense
              )
          }
        }
      };
    case SKILL1_0:
      return {
        ...state,
        characters: triggerActiveSkills(state.characters, 0)
      };
    case SKILL1_1:
      return {
        ...state,
        characters: triggerActiveSkills(state.characters, 1)
      };
    case ULTIMATE_0:
      return {
        ...state,
        characters: {
          ...state.characters,
          1: {
            ...state.characters[1],
            life:
              state.characters[1].life -
              calculateDamage(
                state.characters[0].attack * 2,
                state.characters[1].defense
              )
          }
        }
      };
    case ULTIMATE_1:
      return {
        ...state,
        characters: {
          ...state.characters,
          0: {
            ...state.characters[0],
            life:
              state.characters[0].life -
              calculateDamage(
                state.characters[1].attack * 2,
                state.characters[0].defense
              )
          }
        }
      };
    case SET_WINNER:
      return {
        ...state,
        winner: action.payload
      };
    default:
      return state;
  }
}