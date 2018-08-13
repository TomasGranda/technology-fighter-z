import { 
  SELECT_CHARACTER,
  UNSELECT_CHARACTER
} from '../actions/types';

const initialState = {
  selected: []
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
    default:
      return state;
  }
};