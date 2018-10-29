import { combineReducers } from "redux";

import characterReducer from "./characterReducer";
import fightReducer from "./fightReducer";
import sectionReducer from "./sectionReducer";
import multiplayerReducer from "./multiplayerReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  character: characterReducer,
  fight: fightReducer,
  section: sectionReducer,
  multiplayer: multiplayerReducer,
  error: errorReducer
});