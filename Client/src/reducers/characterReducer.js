import {
  GET_CHARACTERS,
  SELECT_CHARACTER,
  UNSELECT_CHARACTER,
  ADD_CHARACTER,
  LOADING_CHARACTERS,
  CLEAR_SELECTION
} from "../actions/types";

const initialState = {
  selected: [],
  characters: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
        loading: false
      };
    case SELECT_CHARACTER:
      return {
        ...state,
        selected: state.selected.concat(action.payload)
      };
    case UNSELECT_CHARACTER:
      return {
        ...state,
        selected: state.selected.filter(id => id !== action.payload)
      };
    case CLEAR_SELECTION:
      return {
        ...state,
        selected: []
      };
    case ADD_CHARACTER:
      return {
        ...state,
        characters: [action.payload, ...state.characters]
      };
    case LOADING_CHARACTERS:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}