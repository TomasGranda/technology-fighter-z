import { 
  SELECT_CHARACTER,
  UNSELECT_CHARACTER,
  ADD_CHARACTER
} from '../actions/types';

const initialState = {
  selected: [],
  characters: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_CHARACTER:
      return({
        ...state,
        selected: state.selected.concat(action.payload)
      });
    case UNSELECT_CHARACTER:
      return({
        ...state,
        selected: state.selected.filter(id => id !== action.payload)
      });
    case ADD_CHARACTER:
      return {
        ...state,
        characters: [action.payload, ...state.characters]
      }
    default:
      return state;
  }
};