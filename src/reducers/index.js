import { combineReducers } from 'redux';

import characterReducer from './characterReducer';
import fightReducer from './fightReducer';

export default combineReducers({
  character: characterReducer,
  fight: fightReducer
});